const { createApp } = Vue

const Boolzapp = createApp({
    data() {
        return {
            contacts: contacts,
            activeContact: {...contacts[0]},
            lastMsg: undefined,
        }

    },

    methods: {
        showConvo(index) {
            const reactive = this.contacts[index].messages
        
            this.activeContact = {...this.contacts[index]}
        
            for (i = 0; i < reactive.length; i++) {
        
                const textMsg = reactive[i]
        
            }
        
        },
        

        isLastMsg(messages,currentIndex) {
           if ((currentIndex) == messages.length - 1) {
            return true
           }
        }
    },

}).mount("#boolzapp")





