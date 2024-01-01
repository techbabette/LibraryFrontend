<template>
    <div class="col-12 col-md-6 info-block mk-flex-column-center">
        <h2 id="memNum">{{ shownValue }}</h2>
        <h3>{{ title }}</h3>
    </div>
</template>
<script>

export default {
    name : "InfoBlock",
    props : {
        title : String,
        maxValue : Number,
        startValue : {
            Type : Number,
            default : 0
        },
        step : {
            Type : Number,
            default : 1
        },
        timeToLoad : {
            Type : Number
        }
    },
    data(){
        return {
            shownValue : this.startValue
        }
    },
    mounted(){
        this.countToValue();
    },
    watch: {
        maxValue : function(){
            this.countToValue();
        }
    },
    methods : {
        countToValue(){
            let that = this;
            let interval = this.timeToLoad/Math.abs(this.startValue - this.maxValue);
            let counter = setInterval(function(){
                if(that.maxValue === that.shownValue){
                    clearInterval(counter);
                    return;
                }
                if(that.shownValue > that.maxValue){
                    that.shownValue -= that.step;
                    return;
                }
                that.shownValue += that.step
            }, interval)
        }
    }
}
</script>