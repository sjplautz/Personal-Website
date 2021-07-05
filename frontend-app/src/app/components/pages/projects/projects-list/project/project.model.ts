export class Project {
    public name: string;
    public description: string;
    public imagePath: string;
    public route: string;
    public ready: boolean;

    constructor(name: string, desc: string, imagePath: string, route: string, ready: boolean){
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.route = route;
        this.ready = ready;
    }
}