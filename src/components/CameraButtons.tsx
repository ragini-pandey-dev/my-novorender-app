import { FC, useState } from 'react';
import { FlightController, View } from '@novorender/api';
import { type ReadonlyVec3, type ReadonlyQuat } from "gl-matrix";

import { CameraControllerType } from '../common';
import './CameraButtons.css';

interface CameraPosition {
    name: string;
    position: ReadonlyVec3;
    rotation: ReadonlyQuat;
}

interface CameraButtonsProps {
    view: View;
}

const CameraButtons: FC<CameraButtonsProps> = ({ view }) => {
    const initialCameraPositions: CameraPosition[] = [
        {
            name: "Camera 1",
            position: [0, 0, 0],
            rotation: [0, 0, 0, 0]
        },
        {
            name: "Camera 2",
            position: [0, 0, 0],
            rotation: [0, 0, 0, 0]
        },
        {
            name: "Camera 3",
            position: [0, 0, 0],
            rotation: [0, 0, 0, 0]
        }
    ];

    const [savedCameraPositions, setSavedCameraPositions] = useState<CameraPosition[]>(initialCameraPositions);

    const handleClick = (index: number) => {
        const { position, rotation } = savedCameraPositions[index];
        view.switchCameraController(CameraControllerType.FLIGHT, {
            rotation,
            position,
        });
        alert(`${initialCameraPositions[index].name} position applied`)

    };

    const handleShiftClick = (index: number) => {
        FlightController.assert(view.activeController);

        const newPosition = view.activeController.position;
        const newRotation = view.activeController.rotation;

        setSavedCameraPositions((prevPositions) => {
            const updatedPositions = [...prevPositions];
            updatedPositions[index] = {
                ...prevPositions[index],
                position: newPosition,
                rotation: newRotation
            };
            return updatedPositions;
        });
        alert(`${initialCameraPositions[index].name} position and rotation saved`)
    };

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        if (event.shiftKey) {
            handleShiftClick(index);
        } else {
            handleClick(index);
        }
    };

    return (
        <div className="camera-buttons-container">
          {
            savedCameraPositions.map((position, index) => (
              <button key={index} onClick={(event) => handleButtonClick(event, index)}>
                {position.name}
              </button>
            ))
          }
        </div>
      );
};

export default CameraButtons;
