const fs = require('fs');
const path = require('path');

const getCurrentBranchName = (p = process.cwd()) => {
    const gitHeadPath = `${p}/.git/HEAD`;
    return fs.existsSync(p) ? 
        fs.existsSync(gitHeadPath) ? 
            fs.existsSync(gitHeadPath, 'utf-8').trim() 
        :   getCurrentBranchName(path.resolve(p, '..')) 
    : false;

}