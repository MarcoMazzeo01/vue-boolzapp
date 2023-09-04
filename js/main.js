const { createApp } = Vue
const { DateTime } = luxon

const Boolzapp = createApp({
    data() {
        return {
            contacts: contacts,
            activeContact: {...contacts[0]},
            lastMsgInSequence: undefined,
            newMsg: '',
            replyDebounce: false,
            searchQuery: '',
            searchResult: [],
        }

    },

    computed: { // * messo in computed in modo che la lista contatti venga renderizzata automaticamente quando la pagina carica
        searchContact() {
            this.searchResult = this.contacts.filter(contact => {
                const queryResult = contact.name.toLowerCase().includes(this.searchQuery.toLowerCase())
                //  console.log(queryResult)
                return queryResult
            })
            // console.log(this.searchResult)
            return this.searchResult
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

        sendMsg() {

           if (this.newMsg == '' || this.replyDebounce == true) { return }

           this.replyDebounce = true
            const newMsg = {
                date: '12:00',
                message: this.newMsg,
                status: 'sent'
            }
            this.activeContact.messages.push(newMsg)
            
            setTimeout(() => {
                const reply = {
                    date: '12:00',
                    message: "OKURRR!",
                    status: 'received'
                }
                this.activeContact.messages.push(reply)
                this.lastMsgInSequence = this.getLastMsgInSequence(this.activeContact.messages)
                this.replyDebounce = false
            },1000)

            this.lastMsgInSequence = this.getLastMsgInSequence(this.activeContact.messages)
            this.newMsg = ''
            
        },

        formatTime(date) {
            const dateTime = DateTime.fromFormat(date, 'dd/MM/yyyy HH:mm:ss');
            const formattedTime = dateTime.toFormat('HH:mm');
            return formattedTime

        }
    },

    created() {
        this.lastMsgInSequence = this.getLastMsgInSequence(this.activeContact.messages)
        // console.log(this.lastMsgInSequence)
    }

}).mount("#boolzapp")





