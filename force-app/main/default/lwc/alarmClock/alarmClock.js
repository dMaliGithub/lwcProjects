import { LightningElement } from 'lwc';
import AlarmClockAssets from '@salesforce/resourceUrl/AlarmClockAssets'
export default class AlarmClock extends LightningElement {

    // use static resource in js
    // 1. import the static resource
    // 2. store it in 1 property
    clockImage = AlarmClockAssets+'/AlarmClockAssets/clock.png';
    ringtone = new Audio(AlarmClockAssets+'/AlarmClockAssets/Clocksound.mp3');
    currentTime='';
    hours=[];
    minutes=[];
    meridian = ["AM","PM"];
    hourSelected;
    minSelected;
    meridianSelected;
    alarmTime;
    isAlarmSet=false;
    isAlarmTriggered = false;

    get isFieldsSelected(){
        // returns true if all fields value are selected else false
        return !(this.hourSelected && this.minSelected && this.meridianSelected);
    }


    get shakeImage(){
        return this.isAlarmTriggered ? 'shake':'';
    }
    connectedCallback(){
        this.createHoursOption();
        this.createMinOption();
        setInterval(() => {
            this.getCurrentDateTime();
        },1000)
    }

    createHoursOption(){
        for(let hr = 1; hr<=12;hr++)
        {
            let hour = hr<10 ? "0"+hr : hr;
            this.hours.push(hour);
        }
        // console.log(this.hours);
    }

    createMinOption(){
        for(let min = 0; min<=59; min++)
        {
            let m = min < 10 ? "0"+min : min;
            this.minutes.push(m);
        }
        // console.log(this.minutes);
    }
    getCurrentDateTime(){
        let dateTime = new Date();
        let hour = dateTime.getHours();
        let min = dateTime.getMinutes();
        let sec = dateTime.getSeconds();
        let meridian = "AM";
        if(hour == 0)
        {
            hour = 12;
        }
        else if(hour == 12)
        {
            meridian = "PM";
        }
        else if(hour >= 12)
        {
            hour = hour - 12;
            meridian = "PM";
        }

        hour = hour<10 ? "0"+hour : hour;
        min = min < 10 ? "0"+min : min;
        sec = sec < 10 ? "0"+sec : sec;
        this.currentTime = `${hour}:${min}:${sec} ${meridian}`;
        if(this.alarmTime == `${hour}:${min} ${meridian}`)
        {
            // console.log('Alarm Triggered!!');
            this.isAlarmTriggered=true;
            this.ringtone.play();
            this.ringtone.loop=true;
        }
    }

    optionhandler(event){
        const {label,value} = event.detail;
        if(label==='Hour(s)')
        {
            this.hourSelected = value;
        }
        else if(label==="Minutes(s)")
        {
            this.minSelected = value;
        }
        else if(label==="AM/PM"){
            this.meridianSelected = value;
        }
        else{}

        // console.log("this.hourSelected: ", this.hourSelected);
        // console.log(" this.minSelected: ", this.minSelected);
        // console.log("this.meridianSelected", this.meridianSelected);
    }

    setAlarmHandler(){
        this.alarmTime = `${this.hourSelected}:${this.minSelected} ${this.meridianSelected}`;
        this.isAlarmSet = true;
    }

    clearAlarmHandler(){
        this.alarmTime = '';
        this.isAlarmSet = false;
        this.isAlarmTriggered=false;
        this.ringtone.pause();
        // call public child method using parent child comm.
        const elements = this.template.querySelectorAll('c-clock-drop-down');
        //above returns node list so we need to convert it into array
        Array.from(elements).forEach(element=>{
            // calling out reset for each dropdown component
            element.reset("");
        })
    }
}