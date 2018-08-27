<template>
  <div>
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
        this.onVerify();
      }
    },
    clear() {
      this.$refs.contact.reset();
      this.snackbar = false;
    },
  },
};
</script>
