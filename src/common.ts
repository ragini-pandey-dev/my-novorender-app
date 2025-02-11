import { createAPI, SceneData } from "@novorender/data-js-api";
import { getDeviceProfile, GPUTier, View } from "@novorender/api";

export enum CameraControllerType {
    FLIGHT = "flight",
  }

interface SceneConfig {
    boundingSphere: {
        center: [number, number, number];
        radius: number;
    };
}

interface LoadSceneResult {
    sceneData: SceneData;
    sceneConfig: SceneConfig;
}

const CONDOS_SCENE_ID = "95a89d20dd084d9486e383e131242c4c";

const serviceUrl = "https://data.novorender.com/api";

export async function loadPublicScene(view: View): Promise<LoadSceneResult> {
    try {

        const dataApi = createAPI({ serviceUrl });

        const sceneData = await dataApi.loadScene(CONDOS_SCENE_ID);

        if ("error" in sceneData) {
            throw sceneData;
        }

        // Destructure relevant properties into variables
        const { url: _url } = sceneData;
        const url = new URL(_url);
        const parentSceneId = url.pathname.replace(/\//g, "");
        url.pathname = "";

        // Load the scene using URL gotten from `sceneData`
        const sceneConfig: any = await view.loadScene(
            url,
            parentSceneId,
            "index.json"
        );

        const { center, radius } = sceneConfig.boundingSphere;
        view.activeController.autoFit(center, radius);

        return { sceneData, sceneConfig };
    } catch (error) {
        console.error("Error loading public scene:", error);
        throw error;
    }
}

export async function createView(
    canvas: HTMLCanvasElement,
    gpuTier: GPUTier = 2
): Promise<View> {
    // Get Device Profile
    const deviceProfile = getDeviceProfile(gpuTier);
    const baseUrl = new URL("/novorender/api/", window.location.origin);
    const imports = await View.downloadImports({ baseUrl });

    // Create and return a View
    return new View(canvas, deviceProfile, imports);
}

export const changeCameraController = (
    view: View,
    cameraControllerType: CameraControllerType
) => {
    view.switchCameraController(cameraControllerType);
};