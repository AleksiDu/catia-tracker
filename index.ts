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

      const tableRow = `
      |--------------|------------------|---------------|
      | ${processName}    | ${formattedDate}       | ${formattedRuntime}    |\n`;

      let existingContent = "";
      if (fs.existsSync("runtime.txt")) {
        existingContent = await fs.promises.readFile("runtime.txt", "utf-8");
      }

      if (existingContent.length > 0) {
        const lines = existingContent.split("\n");
        existingContent =
          lines[0] + "\n" + tableRow + lines.slice(2).join("\n");
      } else {
        existingContent = `| Process Name | Start Time       | Runtime       |\n${tableRow}`;
      }

      await fs.promises.writeFile("runtime.txt", existingContent);
      startTime = null;
    } else {
      console.log(`${processName} not started yet.`);
    }
  } catch (error) {
    console.error(`Error checking for ${processName}`, error);
  }
};

setInterval(() => checkFor("CNEXT.exe"), 10000);
