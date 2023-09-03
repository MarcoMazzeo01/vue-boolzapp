const { createApp } = Vue

const Boolzapp = createApp({
    data() {
        return {
            contacts: contacts,
            activeContact: {...contacts[0]},
            lastMsgInSequence: undefined,
        }

    },

    methods: {
        loadConvo(index) {
            this.activeContact = {...this.contacts[index]}
            this.lastMsgInSequence = this.getLastMsgInSequence(this.activeContact.messages)
        },

        getLastMsgInSequence(messages) {
            const lastMessages = [];
            let currentStatus = null;
          
            for (let i = messages.length - 1; i >= 0; i--) {
              const message = messages[i];
              if (message.status !== currentStatus) {

                message.index = i
                lastMessages.push(message);
                currentStatus = message.status;
              }
            }
            return lastMessages.reverse();
        },

        isLastMsgInSequence(index,msgObj) {

            for (let i = 0; i <= (this.lastMsgInSequence.length - 1); i++) {
                if (index == this.lastMsgInSequence[i].index) {
                    const status = this.lastMsgInSequence[i].status;
                   return (status == 'sent') ? 'right' : 'left'
                }
            }
            
            return '';
            

        },




        isLastMsg(messages,currentIndex) {
           if ((currentIndex) == messages.length - 1) {
            return true
           }
        }
    },

    created() {
        this.lastMsgInSequence = this.getLastMsgInSequence(this.activeContact.messages)
        console.log(this.lastMsgInSequence)
    }

}).mount("#boolzapp")





