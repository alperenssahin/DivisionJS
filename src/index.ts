import {readFileSync, PathOrFileDescriptor, writeFileSync} from "fs"

export class Division{
    private tag: String;
    private innerText: string;
    private className: string;
    static div():Division{
        return new Division("div")
    }
    static h1():Division{
        return new Division("h1")
    }
    constructor(tag:String) {
        console.log(`Constructing tag : ${tag}`)
        this.tag = tag
        this.innerText = ''
        this.className = ''
    }
    setInnerText(text:string){
        this.innerText = text
        return this
    }
    setClassName(classname:string){
        this.className = classname
        return this
    }
    generateHTML(){
        return `<${this.tag} class="${this.className}">${this.innerText}</${this.tag}>`
    }
    static compile(divisionFilePath:PathOrFileDescriptor):String{
        const raw = readFileSync(divisionFilePath,{encoding:"utf-8"})
        const matchedDivision = raw.match(/Division.\w+\(([\x00-\x7F]+?)?\)[\s]+/gm)
        if(matchedDivision){
            const compiledJS = `
        const {Division} = require("../build/index")
        const fs = require("fs")
        const x  = [
            ${matchedDivision.join(",")}
        ]
        const compiledVue = \`
        <template>
            <div>
                \${x.map(s=>s.generateHTML()).join('')} 
            </div> 
        </template>
        <script>
         
        </script>
        <style scoped>
        
        </style>
        \`
        fs.writeFileSync('${divisionFilePath+".vue"}',compiledVue,{encoding:"utf-8"})
        `
            writeFileSync(divisionFilePath+".compiled",compiledJS,{encoding:"utf-8"})

        }
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