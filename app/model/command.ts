import reminder from './commandList/reminder';
import github from './commandList/github';

export default {
    githubCommand(bot: any, message:any, value:any){
        github();
    }
}