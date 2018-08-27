<template>
  <div>
    <v-container grid-list-xl>
      <v-layout
        row
        wrap
        grid-list-md
      >

        <v-flex
          sm12
          md6
        >
          <v-form
            ref="contact"
            v-model="form.valid"
            name="contact-form"
            column
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            method="post"
            @submit.prevent="send"
          >
            <div style="display: none">
              <input name="bot-field">
            </div>
            <v-text-field
              v-model="form.name"
              label="Name"
              name="name"
              :rules="form.nameRules"
              autocomplete="off"
              clearable
              flex
              required
            />

            <v-text-field
              v-model="form.email"
              label="E-mail"
              autocomplete="off"
              name="email"
              :rules="form.emailRules"
              clearable
              required
            />

            <v-textarea
              v-model="form.message"
              label="Message"
              :rules="form.messageRules"
              name="message"
              rows="3"
              counter="160"
              clearable
              no-resize
              required
            />

            <v-layout
              row
              grid-list-md
              align-center
              justify-space-between
              class="mt-3"
            >
              <v-btn
                color="secondary"
                type="submit"
                :disabled="!form.valid"
              >
                Send
              </v-btn>
            </v-layout>
          </v-form>
        </v-flex>

        <v-flex>
          <v-list style="background: transparent">
            <v-list-tile v-if="email">
              <v-list-tile-action>
                <v-icon>email</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="email.join(', ')" />
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="phone">
              <v-list-tile-action>
                <v-icon>phone</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="phone.join(', ')" />
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="fax">
              <v-list-tile-action>
                <v-icon>print</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="fax.join(', ')" />
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="address">
              <v-list-tile-action>
                <v-icon>place</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="address" />
                <v-list-tile-sub-title
                  v-if="address2"
                  v-text="address2"
                />
              </v-list-tile-content>
            </v-list-tile>
          </v-list>

          <!-- <no-ssr class="mt-4">
            <social-networks :networks="social" btn-class="mx-3" icon-size="2x"/>
          </no-ssr> -->
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar
      v-model="snackbar"
      bottom
      right
    >
      {{ snackMsg }}
      <v-btn
        flat
        color="success"
        @click.native="clear"
      >OK</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import VForm from '@vuetify/es5/components/VForm';
import VTextField from '@vuetify/es5/components/VTextField';
import VTextarea from '@vuetify/es5/components/VTextarea';

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

export default {
  components: {
    VForm,
    VTextField,
    VTextarea,
  },
  props: [
    'title',
    'subtitle',
    'address',
    'address2',
    'email',
    'phone',
    'fax',
    'social',
  ],
  data: () => ({
    snackbar: false,
    snackMsg: '',
    form: {
      valid: false,
      name: '',
      nameRules: [v => !!v || 'Name is required'],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid',
      ],
      message: '',
      messageRules: [v => !!v || 'Message is required'],
    },
  }),
  methods: {
    onVerify: function(uid) {
      const { email, name, message } = this.form;
      fetch('https://apek.netlify.com/', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'contact',
          email,
          name,
          message,
          uid,
        }),
      })
        .then(e => {
          this.snackMsg =
            e.status < 400
              ? 'Your message has been sent, thanks!'
              : `Failed to send message because of: ${e.statusText}`;
          this.snackbar = true;
        })
        .catch(error =>
          alert(
            'Unable to send message. Please use an alternative contact, thanks.'
          )
        );
    },

    send() {
      if (this.$refs.contact.validate()) {
        this.onVerify(Math.random());
      }
    },
    clear() {
      this.$refs.contact.reset();
      this.snackbar = false;
    },
  },
};
</script>
