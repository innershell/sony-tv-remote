const IP_ADDR = "10.0.0.108";
const PSK = "6708";
let installedApps = [];
let appDrawer = [];

/******************************************************************************
 * The commands for the TV.
 * - Most commands use REST APIs.
 * - Some commands use IRCC codes only.
 ******************************************************************************/
let commandMap = {
  Input: {
    type: "IRCC",
    code: "AAAAAQAAAAEAAAAlAw==",
  },
  Power: {
    type: "IRCC",
    code: "AAAAAQAAAAEAAAAVAw==",
  },
  Hdmi1: {
    type: "IRCC",
    code: "AAAAAgAAABoAAABaAw==",
  },
  Hdmi2: {
    type: "IRCC",
    code: "AAAAAgAAABoAAABbAw==",
  },
  Hdmi3: {
    type: "IRCC",
    code: "AAAAAgAAABoAAABcAw==",
  },
  Hdmi4: {
    type: "IRCC",
    code: "AAAAAgAAABoAAABdAw==",
  },
  VolumeUp: {
    type: "REST",
    service: "sony/audio",
    body: {
      method: "setAudioVolume",
      params: [
        {
          target: "speaker",
          volume: "+1",
          ui: "on",
        },
      ],
      id: 601,
      version: "1.0",
    },
  },
  VolumeDown: {
    type: "REST",
    service: "sony/audio",
    body: {
      method: "setAudioVolume",
      params: [
        {
          target: "speaker",
          volume: "-1",
          ui: "on",
        },
      ],
      id: 601,
      version: "1.0",
    },
  },
  Mute: {
    type: "IRCC",
    code: "AAAAAQAAAAEAAAAUAw==",
    comment: "Mute control only available as IRCC",
  },
  ChannelUp: {
    type: "IRCC",
    code: "AAAAAQAAAAEAAAASAw==",
  },
  ChannelDown: {
    type: "IRCC",
    code: "AAAAAQAAAAEAAAATAw==",
  },
  Up: {
    type: "IRCC",
    code: "AAAAAQAAAAEAAAB0Aw==",
  },
  Down: {
    type: "IRCC",
    code: "AAAAAQAAAAEAAAB1Aw==",
  },
  Left: {
    type: "IRCC",
    code: "AAAAAQAAAAEAAAA0Aw==",
  },
  Right: {
    type: "IRCC",
    code: "AAAAAQAAAAEAAAAzAw==",
  },
  Confirm: {
    type: "IRCC",
    code: "AAAAAQAAAAEAAABlAw==",
  },
  Back: {
    type: "IRCC",
    code: "AAAAAgAAAJcAAAAjAw==",
  },
  Home: {
    type: "IRCC",
    code: "AAAAAQAAAAEAAABgAw==",
  },
  FlashMinus: {
    type: "IRCC",
    code: "AAAAAgAAAJcAAAB4Aw==",
  },
  Play: {
    type: "IRCC",
    code: "AAAAAgAAAJcAAAAaAw==",
  },
  FlashPlus: {
    type: "IRCC",
    code: "AAAAAgAAAJcAAAB4Aw==",
  },
  Pause: {
    type: "IRCC",
    code: "AAAAAgAAAJcAAAAZAw==",
  },
  Prev: {
    type: "IRCC",
    code: "AAAAAgAAAJcAAAA8Aw==",
  },
  Stop: {
    type: "IRCC",
    code: "AAAAAgAAAJcAAAAYAw==",
  },
  Next: {
    type: "IRCC",
    code: "AAAAAgAAAJcAAAA9Aw==",
  },
  Num1: {
    type: "IRCC",
    code: "AAAAAQAAAAEAAAAAAw==",
  },
  Num2: {
    type: "IRCC",
    code: "AAAAAQAAAAEAAAABAw==",
  },
  Num3: {
    type: "IRCC",
    code: "AAAAAQAAAAEAAAACAw==",
  },
  Num4: {
    type: "IRCC",
    code: "AAAAAQAAAAEAAAADAw==",
  },
  Num5: {
    type: "IRCC",
    code: "AAAAAQAAAAEAAAAEAw==",
  },
  Num6: {
    type: "IRCC",
    code: "AAAAAQAAAAEAAAAFAw==",
  },
  Num7: {
    type: "IRCC",
    code: "AAAAAQAAAAEAAAAGAw==",
  },
  Num8: {
    type: "IRCC",
    code: "AAAAAQAAAAEAAAAHAw==",
  },
  Num9: {
    type: "IRCC",
    code: "AAAAAQAAAAEAAAAIAw==",
  },
  Num0: {
    type: "IRCC",
    code: "AAAAAQAAAAEAAAAJAw==",
  },
  Decimal: {
    type: "IRCC",
    code: "AAAAAgAAAJcAAAAdAw==",
  },
  Display: {
    type: "IRCC",
    code: "AAAAAQAAAAEAAAA6Aw==",
  },

  Apps: {
    type: "REST",
    service: "sony/appControl",
    body: {
      method: "getApplicationList",
      params: [],
      id: 60,
      version: "1.0",
    },
  },
  Netflix: {
    type: "REST",
    service: "sony/appControl",
    body: {
      method: "setActiveApp",
      params: [
        {
          uri: "com.sony.dtv.com.netflix.ninja.com.netflix.ninja.MainActivity",
        },
      ],
      id: 601,
      version: "1.0",
    },
  },
  Disney: {
    type: "REST",
    service: "sony/appControl",
    body: {
      method: "setActiveApp",
      params: [
        {
          uri: "com.sony.dtv.com.disney.disneyplus.com.bamtechmedia.dominguez.main.MainActivity",
        },
      ],
      id: 601,
      version: "1.0",
    },
  },
  Crave: {
    type: "REST",
    service: "sony/appControl",
    body: {
      method: "setActiveApp",
      params: [
        {
          uri: "com.sony.dtv.ca.bellmedia.cravetv.axis.androidtv.sdk.app.MainActivity",
        },
      ],
      id: 601,
      version: "1.0",
    },
  },
  Prime: {
    type: "REST",
    service: "sony/appControl",
    body: {
      method: "setActiveApp",
      params: [
        {
          uri: "com.sony.dtv.com.amazon.amazonvideo.livingroom.com.amazon.ignition.IgnitionActivity",
        },
      ],
      id: 601,
      version: "1.0",
    },
  },
};

/******************************************************************************
 * Use the REST API to send a command.
 ******************************************************************************/
function sendRestCommand(command) {
  return fetch(`http://${IP_ADDR}/${commandMap[command].service}`, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Cache-Control": "no-cache",
      Connection: "close",
      "Content-Type": "application/json; charset=UTF-8",
      Pragma: "no-cache",
      "X-Auth-PSK": `${PSK}`,
      "Sec-Fetch-Mode": "cors",
    },
    body: JSON.stringify(commandMap[command].body),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => console.error("Error:", error));
}

/******************************************************************************
 * Use the IRCC-IP API to send a command.
 ******************************************************************************/
function sendIrccCommand(command) {
  const url = `http://${IP_ADDR}/sony/ircc`;

  const body = `<?xml version="1.0"?>
    <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
      <s:Body>
        <u:X_SendIRCC xmlns:u="urn:schemas-sony-com:service:IRCC:1">
          <IRCCCode>${commandMap[command].code}</IRCCCode>
        </u:X_SendIRCC>
      </s:Body>
    </s:Envelope>`;

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "text/xml; charset=UTF-8",
      SOAPACTION: '"urn:schemas-sony-com:service:IRCC:1#X_SendIRCC"',
      "X-Auth-PSK": PSK,
      Connection: "Keep-Alive",
      "Content-Length": 313,
    },
    body: body,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      console.log("Command sent successfully");
    })
    .catch((error) => {
      console.error("Error sending command:", error);
    });
}

/******************************************************************************
 * TV commands clicked.
 ******************************************************************************/
document.querySelectorAll("button.tv-command").forEach((button) => {
  button.addEventListener("click", (event) => {
    const buttonElement = event.target.closest("button");
    if (buttonElement) {
      const command = buttonElement.dataset.command;

      if (commandMap[command]) {
        commandMap[command].type === "REST" && sendRestCommand(command);
        commandMap[command].type === "IRCC" && sendIrccCommand(command);
      } else {
        console.error("Error: Command not found in commandMap or joystickMap");
      }
    } else {
      console.error("Error: Button element not found");
    }
  });
});

/******************************************************************************
 * Installed apps.
 ******************************************************************************/
document
  .getElementById("tv-installed-apps")
  .addEventListener("click", (event) => {
    sendRestCommand("Apps").then((apps) => {
      // Display installed apps.
      installedApps = apps.result[0];
      let html = "";
      installedApps.forEach((app) => {
        html += `
        <li>
          <img src=${app.icon} style="width: 50px;">
          <span>${app.title}</span>
          <button type="button" class="btn_setup_app" data-title="${app.title}"><i class="material-icons">add</i></button>
        </li>`;
      });
      document.getElementById("installed-apps-list").innerHTML = html;

      // Add app to drawer clicked.
      document.querySelectorAll(".btn_setup_app").forEach((button) => {
        button.addEventListener("click", (event) => {
          const buttonElement = event.target.closest("button");
          if (buttonElement) {
            const selectedAppTitle = buttonElement.dataset.title;
            const selectedApp = installedApps.find(
              (app) => app.title === selectedAppTitle
            );
            console.log(selectedApp);
          } else {
            console.error("Error: Button element not found");
          }
        });
      });
      // End: Add app to drawer clicked.
    });
  });

/******************************************************************************
 * Remove app from drawer clicked.
 ******************************************************************************/
