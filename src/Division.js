const {v4:uuid} = require("uuid")

class Division{
    constructor(born = function(){return []},args = {}) {
        this.attributes = args.attributes || {}
        this.tag = this.attributes.tag || "div"
        this.id = this.attributes.id || uuid().split("-")[0]
        this.born = args.born || function (){console.log(this); return []}
        this.styles = args.styles || {}
        this.children = []
    }

    static div(args){
        return new Division(args)
    }

    styleConverter(){
        let output = ""
        const keys = Object.keys(this.styles)
        keys.forEach((s,i)=>{
            output += `${s}:${this.styles[s]}`
            if(i !== keys.length){
                output += ";"
            }
        })
        return `#${this.id}{${output}}`
    }

    templateConverter(){
        return `<${this.tag} id="${this.id}">${this.convertChildren()}</${this.tag}>`
    }

    convertChildren(){
        return this.children.reduce((a,b)=>a+b.templateConverter(),"")
    }
}

console.log(new Division({style:{"background-color": "#add", "padding": "20px", "margin": "2em"},born:function(){console.log(this)}}, ).born());