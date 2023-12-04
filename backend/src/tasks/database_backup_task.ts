import process from "child_process";
const cron= require("node-cron");

import config from "../config";


const backupDatabase = () => {
    const todayDate = new Date().toISOString().slice(0, 10);
    const timestamp = Date.now();
    const backupDbName = `${config.db_name}-${todayDate}-${timestamp}.dump`;
    const COMMAND = `docker exec ${config.db_container_name} pg_dump -U ${config.db_user} -Fc ${config.db_name} > ${config.db_backup_path}${backupDbName}`;
    try {
        process.exec(COMMAND)
        console.log(`Database backup successfull file file ${backupDbName}`);
    }
    catch (err) {
        console.log(err)
    }

}

const dbBackupTask = cron.schedule('*/10 * * * * *', backupDatabase);

export default dbBackupTask;