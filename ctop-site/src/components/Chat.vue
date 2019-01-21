<template>
  <div class="hello">
    <!-- <nav class="navbar is-white topNav">
    <div class="container">-->
    <!-- <div class="navbar-brand">
          <a class="navbar-item" href="../"></a>
          <div class="navbar-burger burger is-hidden-mobile	" data-target="topNav">
            <span></span>
            <span></span>
            <span></span>
          </div>
    </div>-->
    <!-- <div id="topNav" class="navbar-menu">
          <div class="navbar-start"></div>
          <div class="navbar-end">
            <div class="navbar-item"></div>
          </div>
    </div>-->
    <!-- </div>
    </nav>-->
    <nav class="navbar is-white">
      <div class="container">
        <div class="navbar-menu">
          <div class="navbar-start"></div>
          <div class="navbar-end">
            <div class="qr-code-scan">
              <a @click="showNewQr = true">
                <img src="@/assets/img/qr-code-scan.png">
              </a>
            </div>
            <div class="navbar-item">
              <input class="input" type="search" placeholder="Search..." v-model="search">
            </div>
          </div>
        </div>
      </div>
    </nav>
    <section class="container">
      <div class="columns">
        <div class="column is-3">
          <p class="menu-label" style="font-size: 1.2rem">Chrome to Phone</p>
          <a
            class="button is-info is-block is-alt default-button"
            target="_blank"
            href="https://play.google.com/store/apps/details?id=com.felri.phonetochrome"
          >
            <font-awesome-icon :icon="['fab','google-play']" style="margin-right: 5px"/>Download app
          </a>
          <a
            class="button is-info is-block is-alt default-button"
            target="_blank"
            href="https://chrome.google.com/webstore/detail/chrome-to-phone/hobhnejpjknnhojomhmppgdalddofend"
          >
            <font-awesome-icon :icon="['fab','chrome']" style="margin-right: 5px"/>Downoad extension
          </a>
          <a
            @click="this.createNewQr"
            class="button is-info is-block is-alt default-button is-hidden-mobile"
          >
            <font-awesome-icon icon="qrcode" style="margin-right: 5px"/>New identity
          </a>
          <aside class="menu">
            <!-- 
            <ul class="menu-list">
							<li><span class="tag is-primary is-medium ">Dashboard</span></li>
							<li><span class="tag is-link is-medium ">Customers</span></li>
							<li><span class="tag is-light is-danger is-medium ">Authentication</span></li>
							<li><span class="tag is-dark is-medium ">Payments</span></li>
							<li><span class="tag is-success is-medium ">Transfers</span></li>
							<li><span class="tag is-warning is-medium ">Balance</span></li>
							<li><span class="tag is-medium ">Question</span></li>
            </ul>-->
          </aside>
        </div>
        <div class="column is-9 is-hidden-mobile">
          <div
            class="content chat"
            ref="container"
            v-chat-scroll="{smooth: true, scrollonremoved:true}"
          >
            <div v-for="message in messagesFilter">
              <article
                class="post article"
                :class="{ 'article-op': message.op }"
                :style="{'float': message.op ? 'right' : 'left' }"
              >
                <div
                  class="media all-message"
                  :class="{ 'op-message': message.op, 'message': !message.op }"
                >
                  <div class="media-left">
                    <p class="message-p">{{ message.text }}</p>
                  </div>
                </div>
                <div :class="{ 'media-right': message.op, 'media-left': !message.op }">
                  <span
                    class="has-text-grey-light"
                    style="font-size: 0.7rem"
                    :style="{'float': message.op ? 'right' : 'left' }"
                  >
                    <i class="fa fa-comments"></i>
                    {{ message.createdAt | moment("from", "now") }}
                  </span>
                </div>
              </article>
            </div>
          </div>
          <div class="box-input">
            <div class="columns">
              <div class="column is-11">
                <textarea v-model="textarea" class="textarea" placeholder="Type a message" rows="2"></textarea>
              </div>
              <div class="column is-1" style="padding-left: 0">
                <a class="button is-success" style="margin-top: 15px;" @click="this.sendMessage">
                  <font-awesome-icon style="border-radius: 100px;" icon="play"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="modal is-active" v-if="showNewQr" @click="showNewQr = false">
      <div class="modal-background" @click="showNewQr = false"></div>
      <div class="modal-content" @click.stop>
        <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
        <div>
          <a
            class="button is-info is-block is-alt default-button"
            target="_blank"
            href="https://play.google.com/store/apps/details?id=com.felri.phonetochrome"
          >
            <font-awesome-icon :icon="['fab','google-play']" style="margin-right: 5px"/>Download app
          </a>
        </div>
      </div>
      <button class="modal-close is-large" @click="showNewQr = false" aria-label="close"></button>
    </div>
    <div class="modal is-active" v-if="showQr" @click="showQr = false">
      <div class="modal-background" @click="showQr = false"></div>
      <div class="modal-content" @click.stop>
        <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
        <div>
          <a
            class="button is-info is-block is-alt default-button"
            target="_blank"
            href="https://play.google.com/store/apps/details?id=com.felri.phonetochrome"
          >
            <font-awesome-icon :icon="['fab','google-play']" style="margin-right: 5px"/>Download app
          </a>
        </div>
      </div>
      <button class="modal-close is-large" @click="showQr = false" aria-label="close"></button>
    </div>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  name: "Chat",
  props: {
    msg: String
  },
  data() {
    return {
      value: "https://example.com",
      size: 300,
      showNewQr: false,
      showQr: false,
      qr: "",
      userQr: "",
      userObject: {},
      roomObject: {},
      textarea: "",
      messages: [],
      messagesFilter: [],
      search: ""
    };
  },
  components: {
    QrcodeVue
  },
  mounted() {
    if (localStorage.qr && localStorage.userQr) {
      this.qr = localStorage.qr;
      this.userObject = localStorage.userObject;
      this.roomObject = localStorage.roomObject;
      this.userQr = localStorage.userQr;

      this.getMessages;
    } else {
      this.qr = Math.random()
        .toString(36)
        .substring(2, 19);
      this.userQr = Math.random()
        .toString(36)
        .substring(2, 19);
      this.showQr = true;
    }
    let data = {
      stringQr: this.userQr,
      roomStringQr: this.qr
    };
    this.$socket.emit("newStringQr", data);
  },
  watch: {
    textarea() {
      if (this.search) this.search = "";
    },
    search(newSearch) {
      if (newSearch.length > 0) {
        this.messagesFilter = [];
        for (let message of this.messages) {
          if (message.text.toLowerCase().includes(newSearch.toLowerCase())) {
            this.messagesFilter.push(message);
          }
        }
      } else {
        this.messagesFilter = this.messages;
      }
    },
    qr(newQr) {
      localStorage.qr = newQr;
      this.value = newQr;
    },
    userQr(newUserQr) {
      localStorage.userQr = newUserQr;
    },
    userObject(newUserObject) {
      localStorage.userObject = newUserObject;
    },
    roomObject(newRoomObject) {
      localStorage.roomObject = newRoomObject;
    }
  },
  methods: {
    appendToList(message) {
      if (message.user._id === this.userObject.id) {
        message.op = true;
      }
      this.messages.push(message);
      this.messagesFilter = this.messages;
      var messageDisplay = this.$refs.container;
      messageDisplay.scrollTop = messageDisplay.scrollHeight;
    },
    createNewQr() {
      this.qr = Math.random()
        .toString(36)
        .substring(2, 19);
      this.userQr = Math.random()
        .toString(36)
        .substring(2, 19);
      this.value = this.qr;
      this.messages = [];
      this.messagesFilter = [];
      this.showNewQr = true;
      this.$socket.emit("newId", this.value);
      let data = {
        stringQr: this.userQr,
        roomStringQr: this.qr
      };
      this.$socket.emit("newStringQr", data);
    },
    sendMessage() {
      if (this.textarea.length > 0) {
        let text = this.textarea;
        let sender = this.userObject;
        let room = this.roomObject;
        this.$socket.emit("message", { text, sender, room });
        this.textarea = "";
      }
    }
  },
  sockets: {
    cleanStorage: function() {
      localStorage.clear();
    },
    priorMessages: function(messages) {
      if (messages)
        messages.reverse().forEach(
          function(message) {
            this.appendToList(message);
          }.bind(this)
        );
    },
    userCreated: function(response) {
      (this.userObject = response.user), (this.roomObject = response.room);
    },
    connect: function() {
      console.log("socket connected");
    },
    qrCodeReadOnMobile: function() {
      this.showNewQr = false;
      this.showQr = false;
    },
    incomingMessage: function(message) {
      this.appendToList(message);
    },
    customEmit: function(data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h4 {
  font-size: 1em !important;
}
.box {
  height: 500px;
}
.default-button {
  margin: 10px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.op-message {
  background: #0f77ea;
  color: white;
}
.not-op-message {
  border-radius: 10px;
  background: #f5f5f5;
}
.box-input {
  position: absolute;
  bottom: 0;
  width: 75%;
}
.qr-code-scan > a > img {
  max-height: 40px;
  margin-top: 7px;
}
.all-message {
  border-radius: 10px;
  margin-bottom: 0 !important;
  max-width: 420px;
  padding: 5px 20px;
}
.message {
  padding: 5px 20px;
  margin-bottom: 5px;
}
.message-p {
  max-width: 400px;
  word-wrap: break-word;
  padding-right: 15px;
}
.article {
  margin-bottom: 15px;
}
.article-op {
  float: right;
}
.chat {
  grid-template-rows: 15% 15% 15% 15% 15%;
  width: 100%;
  display: grid;
  margin-bottom: 40px;
  padding: 0 10px;
  padding-bottom: 50px;
  overflow: auto;
  height: 100%;
  min-height: 400px;
  max-height: 500px;
}
::-webkit-scrollbar {
  display: none;
}
.modal-content {
  width: calc(50vh - 40px);
  padding: 20px 0;
  padding-bottom: 0;
  background: white;
}
textarea {
  background: #f3f3f3;
}
</style>
