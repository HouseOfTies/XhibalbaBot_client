export default async function github(user: string, repository: string){
    let url: string = "";
    if(!repository){
        url = `https://api.github.com/users/${user}`;
    }else{
        url = `https://api.github.com/repos/${user}/${repository}`;
    }
    const res = await fetch(url);
}