import si from "systeminformation";
import moment from "moment";
import fs from "fs";

let startTime: moment.Moment | null;
const checkFor = async (processName: string) => {
  try {
    const processes = await si.processes();

    const targetProcess = processes.list.find(
      (process) => process.name === processName
    );
    if (targetProcess) {
      if (!startTime) {
        startTime = moment();
        console.log(`${processName} started.`);
      }
    } else if (startTime) {
      const runtimeInSeconds = moment().diff(startTime, "seconds");
      const formattedDate = moment().format("MM/DD/YYYY");
      const formattedRuntime = `${runtimeInSeconds} seconds`;

      const tableContent =
        `| Process Name | Start Time       | Runtime       |\n` +
        `|--------------|------------------|---------------|\n` +
        `| ${processName}    | ${formattedDate}       | ${formattedRuntime}    |\n`;

      let existingContent = "";
      if (fs.existsSync("runtime.txt")) {
        existingContent = await fs.promises.readFile("runtime.txt", "utf-8");
      }

      const updatedContent = existingContent + tableContent;

      await fs.promises.writeFile("runtime.txt", updatedContent);
      startTime = null;
    } else {
      console.log(`${processName} not started yet.`);
    }
  } catch (error) {
    console.error(`Error checking for ${processName}`, error);
  }
};

setInterval(() => checkFor("CNEXT.exe"), 10000);

// const programStartTime = moment();

// async function trackRuntime() {
//   try {
//     const programEndTime = moment();
//     const runtimeInSeconds = programEndTime.diff(programStartTime, "seconds");

//     // Save the runtime to a file
//     await fs.promises.writeFile("runtime.txt", `${runtimeInSeconds} seconds`);

//     console.log(`Program ran for ${runtimeInSeconds} seconds.`);
//   } catch (error) {
//     console.error("Error tracking runtime:", error);
//   }
// }

// // Call the function to track the runtime
// trackRuntime();
