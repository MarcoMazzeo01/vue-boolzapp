const { createApp } = Vue
const { DateTime } = luxon

const Boolzapp = createApp({
    data() {
        return {
            contacts: contacts,
            activeContact: { ...contacts[0] },
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
            this.activeContact = { ...this.contacts[index] }
            this.lastMsgInSequence = this.getLastMsgInSequence(this.activeContact.messages)
        },

        isLastMsgInSequence(index, messages) {
            const currentMsgObj = messages[index]

            const nextIndex = (index + 1 >= messages.length) ? messages.length : index + 1
            const nextMsg = messages[nextIndex]

            if (!nextMsg) {
                return (currentMsgObj.status == 'sent') ? 'localUser__tail' : 'sender__tail'
            } else {

                if (currentMsgObj.status !== nextMsg.status) {
                    return (currentMsgObj.status == 'sent') ? 'localUser__tail' : 'sender__tail'
                } else {
                    return '';
                }
            }


        },

        sendMsg() {
            if (this.newMsg == '' || this.replyDebounce == true) { return }

            this.replyDebounce = true

            // console.log(DateTime.now().toLocaleString({...DateTime.DATETIME_SHORT_WITH_SECONDS, day: '2-digit', month: '2-digit'}).replace(",",""))

            const newMsg = {
                date: DateTime.now().toLocaleString({ ...DateTime.DATETIME_SHORT_WITH_SECONDS, day: '2-digit', month: '2-digit' }).replace(",", ""),
                message: this.newMsg,
                status: 'sent'
            }
            this.activeContact.messages.push(newMsg)

            setTimeout(() => {
                const reply = {
                    date: DateTime.now().toLocaleString({ ...DateTime.DATETIME_SHORT_WITH_SECONDS, day: '2-digit', month: '2-digit' }).replace(",", ""),
                    message: "OKURRR!",
                    status: 'received'
                }
                this.activeContact.messages.push(reply)
               
                this.replyDebounce = false
            }, 1000)

            this.newMsg = ''

        },

        formatTime(date) {
            const dateTime = DateTime.fromFormat(date, 'dd/MM/yyyy HH:mm:ss');
            const formattedTime = dateTime.toFormat('HH:mm');
            // console.log(dateTime, formattedTime)
            return formattedTime

        },

        promptMenu(msg, bool) {
            msg.showMenu = bool
        }
    },


}).mount("#boolzapp")





