import React, { Component, useEffect, useState } from "react";
import * as THREE from "three";
import { HexColorPicker } from "react-colorful";

enum fieldToChange {
  x,
  y,
  z,
}

enum colorToChange {
  r,
  g,
  b,
}

function setWireframeVisibility(
  objectClicked: THREE.Mesh | null,
  wireframeStatus: boolean,
) {
  objectClicked.material.wireframe = wireframeStatus;
}

function setColorRGB(
  objectClicked: THREE.Mesh | null,
  colToChange: colorToChange,
  newValue: number,
) {
  // Intensity: 0.0 - 1.0, RGB: 0 - 255
  // objectClicked.material.color.r/g/b returns intensity (?)
  // RGB value = Intensity * 255
  const R = objectClicked?.material.color.r;
  const G = objectClicked?.material.color.g;
  const B = objectClicked?.material.color.b;
  let colorRGB;

  switch (colToChange) {
    case colorToChange.r: {
      colorRGB = new THREE.Color(newValue / 255, G, B);
      break;
    }
    case colorToChange.g: {
      colorRGB = new THREE.Color(R, newValue / 255, B);
      break;
    }
    case colorToChange.b: {
      colorRGB = new THREE.Color(R, G, newValue / 255);
      break;
    }
    default: {
      colorRGB = new THREE.Color(R, G, B);
    }
  }

  objectClicked?.material.color.set(colorRGB);
  // const newMaterial = new THREE.MeshBasicMaterial({ color: colorRGB });
  // objectClicked!.material = newMaterial;
}

function setPos(
  objectClicked: THREE.Mesh | null,
  posToChange: fieldToChange,
  posChange: number,
) {
  switch (posToChange) {
    case fieldToChange.x: {
      objectClicked?.position.setX(posChange);
      break;
    }
    case fieldToChange.y: {
      objectClicked?.position.setY(posChange);
      break;
    }
    case fieldToChange.z: {
      objectClicked?.position.setZ(posChange);
      break;
    }
    default: {
      console.log("How the hell did you break me ??");
    }
  }
}

function setRotEuler(
  objectClicked: THREE.Mesh | null,
  posToChange: fieldToChange,
  angleChangeDeg: number,
) {
  //Convert to rads
  let angleChangeRad = THREE.MathUtils.degToRad(angleChangeDeg);

  switch (posToChange) {
    case fieldToChange.x: {
      objectClicked!.rotation.x = angleChangeRad;
      break;
    }
    case fieldToChange.y: {
      objectClicked!.rotation.y = angleChangeRad;
      break;
    }
    case fieldToChange.z: {
      objectClicked!.rotation.z = angleChangeRad;
      break;
    }
    default: {
      console.log("How the hell did you break me ??");
    }
  }
}

function setScale(
  objectClicked: THREE.Mesh | null,
  posToChange: fieldToChange,
  scaleVal: number,
) {
  switch (posToChange) {
    case fieldToChange.x: {
      objectClicked?.scale.setX(scaleVal);
      break;
    }
    case fieldToChange.y: {
      objectClicked?.scale.setY(scaleVal);
      break;
    }
    case fieldToChange.z: {
      objectClicked?.scale.setZ(scaleVal);
      break;
    }
    default: {
      console.log("How the hell did you break me ??");
    }
  }
}

interface RightPanelProps {
  objectClicked: THREE.Mesh | null;
  objectClickedUUID: string | null;
  sceneInfo: Array<any>;
}

export function RightPanel({
  objectClicked,
  objectClickedUUID,
  sceneInfo,
}: RightPanelProps) {
  //The left panel updates the group name which is
  //what we want to display
  let [objectClickedParentName, setObjectClickedParentName] =
    useState<string>("");

  useEffect(() => {
    if (objectClicked) {
      //objectClicked.geometry.computeBoundingSphere()

      const filteredObjects = sceneInfo.filter(
        (object) => object?.uuid?.includes(objectClickedUUID),
      );

      sceneInfo.forEach((object) => {
        if (object?.uuid?.includes(objectClickedUUID)) {
          console.log(object.name);
          setObjectClickedParentName(object.name);
        }
      });
      //console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
      //console.log(objectClickedParentName)
      //console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
      // console.log(objectClicked);
      // console.log(objectClicked.geometry.type);//string
      // console.log(objectClicked.name);//string

      // console.log(objectClicked.material.color);
      // setColorRGB(objectClicked, colorToChange.r, 120);
      // console.log(objectClicked.material.color);

      //setRotEuler(objectClicked, fieldToChange.y, 45);
      // setScale(objectClicked, fieldToChange.x, 2);

      /*The logs below should be things we should display and be able to edit*/
      // console.log(objectClicked.material.color);//vector
      // console.log(objectClicked.material.wireframe);//T or F
      // console.log(objectClicked?.position);//vector
      // console.log(objectClicked?.rotation);//vector
      // console.log(objectClicked?.scale);//vector
      // console.log(objectClicked?.quaternion);//vector
    }
  }, [objectClicked]);

  const [hex, setHex] = useState("#59c09a");
  const [isCollapsed, setIsCollapsed] = useState<Boolean>(true);
  const [colorID, setColorID] = useState(
    "#" + objectClicked?.material.color.getHexString(),
  );

  const fields = Object.values(fieldToChange).filter((field) =>
    isNaN(Number(field)),
  );
  const rgb = Object.values(colorToChange).filter((field) =>
    isNaN(Number(field)),
  );

  const scrollbarStyles = `
  ::-webkit-scrollbar {
    width: 20px; 
    height: 20px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #1a1a1a ;
    border-radius: 16px;
    border: 4px solid #3a3b3a; 
  }

  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-corner {
    background-color: #3a3b3a;
  }

  ::-webkit-scrollbar-button {
    display:none;
  }
`;

  const propertySection = (
    sectionName: string,
    fieldName: string,
    ratio: number,
    decimalValue: number,
  ) => (
    <div>
      {sectionName}
      {Object.values(fields).map((field) => (
        <div
          className="flex items-center border-2 border-grayFill hover:border-gray-600 active:border-gray-600 rounded p-1"
          key={field}
        >
          <label className="whitespace-nowrap px-4 text-gray-400">
            {field.toString().toUpperCase()}
            {fieldName}
          </label>
          <div
            id={`${sectionName.toLowerCase()}_${field}`}
            className=" w-full bg-grayFill"
            contentEditable={true}
            suppressContentEditableWarning={true}
            onBlur={() => {
              updateProperty(
                `${sectionName.toLowerCase()}_${field}`,
                objectClicked,
                2,
              );
            }}
          >
            {formatNumber(
              objectClicked![
                sectionName.toLowerCase() as keyof typeof objectClicked
              ][field as keyof typeof fieldToChange] * ratio,
              2,
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="fixed flex flex-row top-5 bottom-5 right-3 rounded-lg">
        {/* Collapse-Tab Button */}
        <div className="flex justify-start items-center w-8 h-full">
          <button
            className="bg-graySubFill rounded-l-lg  hover:bg-blueHover h-full"
            onClick={() => {
              setIsCollapsed(!isCollapsed);
            }}
          >
            <img
              src={isCollapsed ? "openPanel.svg" : "collapsePanel.svg"}
              width="40"
              alt="icon"
            />
          </button>
        </div>

        {isCollapsed ? (
          <div className="flex flex-col space-y-3 top-10 bottom-10 right-3 p-4 w-56 h-full bg-grayFill rounded-r-lg text-sm overflow-auto">
            <style>{scrollbarStyles}</style>
            <h1 className="italic">
              {" "}
              {objectClickedParentName || "Default Name"}{" "}
            </h1>

            <div>
              <LineSeparator />
              Color
              <HexColorPicker
                color={colorID}
                style={{
                  width: "auto",
                  height: "100px",
                  margin: "15px 5px 15px 5px",
                  borderRadius: "0px",
                }}
                onChange={(e) => {
                  setColorID(e);
                  objectClicked?.material.color.set(e);
                }}
              />
              <div className="grid grid-cols-3 content-evenly">
                {Object.values(rgb).map((color_char) => (
                  <div
                    className="flex items-center border-2 border-grayFill hover:border-gray-600 active:border-gray-600 rounded p-1"
                    key={color_char}
                  >
                    <label className="pr-2 text-gray-400">
                      {" "}
                      {color_char.toString().toUpperCase()}{" "}
                    </label>
                    <div
                      id={`color_${color_char}`}
                      className="p-0.5 w-full bg-grayFill"
                      contentEditable={true}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        updateProperty(`color_${color_char}`, objectClicked, 2);
                      }}
                      onKeyDown={(e) => {
                        limitTextLength(`color_${color_char}`, e, 3);
                      }}
                    >
                      {formatNumber(
                        objectClicked?.material.color[
                          color_char as keyof typeof colorToChange
                        ] * 255,
                        0,
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {/* Color Display Box / Table Picker */}
              <input
                className="mt-2 w-full"
                type="color"
                value={colorID}
                style={{ backgroundColor: colorID }}
                onChange={(e) => {
                  setColorID(e.target.value);
                  objectClicked?.material.color.set(e.target.value);
                }}
              />
            </div>

            <div>
              <LineSeparator />
              {propertySection("Position", "", 1, 2)}
              <LineSeparator />
              {propertySection("Rotation", "-axis", 180 / Math.PI, 2)}
              <LineSeparator />
              {propertySection("Scale", "", 1, 2)}
              <LineSeparator />
            </div>

            <div>
              Wireframe
              {objectClicked?.material.wireframe ? (
                <button
                  className="bg-white text-black hover:bg-blueHover ml-5 p-2 rounded-lg w-16"
                  onClick={() => {
                    setWireframeVisibility(objectClicked, false);
                  }}
                >
                  {" "}
                  ON{" "}
                </button>
              ) : (
                <button
                  className="bg-graySubFill hover:bg-blueHover ml-5 p-2 rounded-lg w-16"
                  onClick={() => {
                    setWireframeVisibility(objectClicked, true);
                  }}
                >
                  {" "}
                  OFF{" "}
                </button>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

// ------------------------------------------------------------------------------------------------------

function LineSeparator() {
  return <div className="bg-gray-500 w-full h-0.5 my-3 rounded-lg" />;
}

// ------------------------------------------------------------------------------------------------------

const formatNumber = (number: number, decimal: number) => {
  const result = number.toFixed(decimal);
  if (
    (parseFloat(result) * Math.pow(10, decimal)) % Math.pow(10, decimal) ===
    0
  ) {
    return number.toFixed(0);
  }
  return result;
};

// ------------------------------------------------------------------------------------------------------

function updateProperty(
  id: string,
  object: THREE.Mesh | null,
  decimal: number,
) {
  // id = property + "_" + position
  let input = document.getElementById(id) as HTMLDivElement;
  const property = id
    .substring(0, id.length - 2)
    .toLowerCase() as keyof typeof object;

  if (object !== undefined && input !== undefined) {
    let pos = id.charAt(id.length - 1);
    let prevInput;

    if (property === "color") {
      prevInput = formatNumber(object!.material[property][pos] * 255, 0);
    } else if (property === "rotation") {
      prevInput = formatNumber(
        THREE.MathUtils.radToDeg(object![property][pos]),
        decimal,
      );
    } else {
      prevInput = formatNumber(object![property][pos], decimal);
    }

    // Only proceed if input content changes
    if (input.textContent != null && input.textContent !== prevInput) {
      // Remove whitespace
      if (input.textContent.replace(/\s/g, "") === "") {
        input.textContent = prevInput;
        input.innerText = prevInput;
      }
      // Only accept number
      else if (isNaN(Number(input.textContent))) {
        input.textContent = prevInput;
        input.innerText = prevInput;
      }
      // Color value is an integer between 0 and 255
      else if (
        property === "color" &&
        ((parseInt(input.textContent) * 10) % 10 !== 0 ||
          parseInt(input.textContent) < 0 ||
          parseInt(input.textContent) > 255)
      ) {
        input.textContent = prevInput;
        input.innerText = prevInput;
      } else {
        input.textContent = formatNumber(
          parseFloat(input!.textContent!),
          decimal,
        );
        switch (property) {
          case "position": {
            setPos(
              object,
              fieldToChange[pos as keyof typeof fieldToChange],
              parseFloat(input.textContent),
            );
            break;
          }
          case "rotation": {
            // Angle is a value between 0 and 360 --> mod 360
            input.textContent = (
              parseFloat(input.textContent) % 360
            ).toString();
            setRotEuler(
              object,
              fieldToChange[pos as keyof typeof fieldToChange],
              parseFloat(input.textContent),
            );
            break;
          }
          case "scale": {
            setScale(
              object,
              fieldToChange[pos as keyof typeof fieldToChange],
              parseFloat(input.textContent),
            );
            break;
          }
          case "color": {
            setColorRGB(
              object,
              colorToChange[pos as keyof typeof colorToChange],
              parseInt(input.textContent),
            );
            break;
          }
          default:
            break;
        }
      }
    }
  }
}

function limitTextLength(id: string, event: any, maxLength: number) {
  const div = document.getElementById(id) as HTMLDivElement;
  if (div !== undefined) {
    // Prevent "Return" (13)
    // If hit max, only allow "Backspace" (8), "Tab" (9), "Left/Right Arrow" (37/39)
    if (
      event.keyCode === 13 ||
      (div!.textContent!.length >= maxLength &&
        event.keyCode !== 8 &&
        event.keyCode !== 9 &&
        event.keyCode !== 37 &&
        event.keyCode !== 39)
    ) {
      event.preventDefault();
    }
  }
}
