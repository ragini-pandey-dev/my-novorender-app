import { FC, useEffect, useRef, useState } from "react";
import { CameraControllerType, changeCameraController, createView, loadPublicScene } from "./common";
import CameraButtons from "./components/CameraButtons";
import TextSearchInput from "./components/TextSearchInput";
import { createNeutralHighlight, RenderStateHighlightGroups } from "@novorender/api";

const App: FC = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [view, setView] = useState<any>(null);

  useEffect(() => {
    if (canvas.current) {
      main(canvas.current);
    }
  }, []);

  const main = async (canvas: HTMLCanvasElement) => {
    const view = await createView(canvas);
    setView(view);

    await loadPublicScene(view);

    changeCameraController(view, CameraControllerType.FLIGHT);

    view.modifyRenderState({
      grid: { enabled: true },
    });

    await view.run();
    view.dispose();
  };

  const handleSearch = async (query: string) => {
    console.log('Search query:', query);
    try {
      const { sceneData } = await loadPublicScene(view)
      const { db } = sceneData

      if (db) {
        const controller = new AbortController();
        const signal = controller.signal;

        // Run the searches
        // Fluffy search which will search all properties for words starting with "Roof"
        // "Roo" will still find roofs, but "oof" will not
        const iterator = db.search({ searchPattern: query }, signal);

        // In this example we just want to isolate the objects so all we need is the object ID
        const result: number[] = [];
        for await (const object of iterator) {
          result.push(object.id);
        }

        // Then we isolate the objects found
        const renderStateHighlightGroups: RenderStateHighlightGroups = {
          defaultAction: "hide",
          groups: [{ action: createNeutralHighlight(), objectIds: result }],
          defaultPointVisualization: undefined
        };

        // Finally, modify the renderState
        view.modifyRenderState({ highlights: renderStateHighlightGroups });
      }
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <>
      <CameraButtons view={view} />
      <TextSearchInput onSearch={handleSearch} />
      <canvas ref={canvas} style={{ width: "100vw", height: "100vh" }}></canvas>
    </>
  );
};

export default App;