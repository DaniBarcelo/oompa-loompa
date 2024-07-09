export class OompaLoompa {
    id: string
    first_name: string
    last_name: string
    image: string
    profession: string
    gender: string
    description: string

    constructor(id: string, first_name: string, last_name: string, image: string, profession: string, gender: string, description: string) {
        this.id = id
        this.image = image
        this.first_name = first_name
        this.last_name = last_name
        this.profession = profession
        this.gender = gender
        this.description = description
    }

    static toOompaLoompa(item: any): OompaLoompa {
        return new OompaLoompa(
            item.id,
            item.first_name,
            item.last_name,
            "https://media.gettyimages.com/id/525580020/es/foto/a-group-of-oompa-loompa-characters-on-the-set-of-the-movie-willie-wonka-and-the-chocolate.jpg?s=612x612&w=gi&k=20&c=pyruNz7-QCVSnrW5IDif4EPpSVzBoyaOjmtA7X6nniI=",
            //item.image,
            item.profession,
            item.gender,
            item.description ? item.description : ""
        )
    }
}