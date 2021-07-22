import {
    ProjectItem
} from "./ProjectItem"

import {
    DomHelper
} from "../Utility/DOMHelper"

export class ProjectList {
    //projects = []

    constructor(type) {
        this.type = type
        this.projects = []
        const prjItems = document.querySelectorAll(`#${type}-projects li`)
        for (const prjItem of prjItems) {
            this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type))
        }
        console.log(this.projects)
        this.connectDroppable()
    }

    connectDroppable() {
        const list = document.querySelector(`#${this.type}-projects ul`)
        list.addEventListener('dragenter', event => {
            if (event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault()
                list.parentElement.classList.add('droppable')
            }
        })
        list.addEventListener('dragover', e => {
            if (e.dataTransfer.types[0] === 'text/plain') {
                e.preventDefault()

            }
        })

        list.addEventListener('dragleave', e => {
            if (e.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {

                list.parentElement.classList.remove('droppable')
            }
        })

        list.addEventListener('drop', e => {
            const prjId = e.dataTransfer.getData('text/plain')
            if (this.projects.find(p => p.id === prjId)) {
                return
            }

            document.getElementById(prjId).querySelector('button:last-of-type').click()
            list.parentElement.classList.remove('droppable')
            //e.preventDefault()
        })


    }


    setSwitchHandlerFunction(switchHandlerFunction) {
        this.swithcHandler = switchHandlerFunction

    }

    addProject(project) {
        this.projects.push(project)
        DomHelper.moveElement(project.id, `#${this.type}-projects ul`)
        project.update(this.switchProject.bind(this), this.type)
    }


    switchProject(projectId) {
        /* const projectIndex = this.projects.findIndex(p => p.id === projectId)
        this.projects.splice(projectIndex,1) */
        this.swithcHandler(this.projects.find(p => p.id === projectId))
        this.projects = this.projects.filter(p => p.id !== projectId)
    }
}