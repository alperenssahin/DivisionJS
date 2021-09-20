import  {readFileSync , PathOrFileDescriptor} from "fs"

export class Division{
    private tag: String;
    static div():Division{
        return new Division("div")
    }
    static h1():Division{
        return new Division("h1")
    }
    constructor(tag:String) {
        console.log(`Constructing tag : ${tag}`)
        this.tag = tag
    }
    static compile(divisionFilePath:PathOrFileDescriptor):String{
        const raw = readFileSync(divisionFilePath,{encoding:"utf-8"})
        // raw.match(/ /).map()
        let divisions = `<div></div><div></div><div></div>`
        return `
        <template>
            <div>
                ${divisions} 
            </div> 
        </template>
        <script>
         
        </script>
        <style scoped>
        
        </style>
        `
    }
}