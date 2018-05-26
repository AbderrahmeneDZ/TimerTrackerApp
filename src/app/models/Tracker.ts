
export class Tracker{

    description: string
    startAt: Date
    endAt: Date
    duration: number
    breaks: Break[] = []

    calculateDuration(){
        this.duration = this.endAt.getTime()  - this.startAt.getTime() - this.calculateTotalBreaksDuration()
    }

    calculateTotalBreaksDuration():number{
        let duration = 0;
        for(let pause of this.breaks){
            duration += pause.duration
        }
        return duration
    }
}
export class Break{
    startAt: Date
    resumedAt: Date
    duration: number

    calculateBreakDuration(){
        this.duration = this.resumedAt.getTime() - this.startAt.getTime()
    }
}