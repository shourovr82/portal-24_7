import fs from 'fs';


const create_required_directories = () => {
    /** 
     *   create required directories if they are not already exist during the application starup.
    **/

    // create uploads directory
    if (!fs.existsSync('./uploads')) {
        fs.mkdirSync('./uploads');
    }

    // Create user directory 
    if (!fs.existsSync('./uploads/users')) {
        fs.mkdirSync('./uploads/users');
    }

    // Create tack pack directory
    if (!fs.existsSync('./uploads/tackpack')) {
        fs.mkdirSync('./uploads/tackpack');
    }
    
    // Create styles directory 
    if (!fs.existsSync('./uploads/styles')) {
        fs.mkdirSync('./uploads/styles');
    }

    // Create orders directory 
    if (!fs.existsSync('./uploads/orders')) {
        fs.mkdirSync('./uploads/orders');
    }

    // Create backup directory where database backup file will be stored.
    if (!fs.existsSync('./uploads/backup')) {
        fs.mkdirSync('./uploads/backup');
    }

    console.log("Directories successfully craeted!!!")
}

export default create_required_directories;