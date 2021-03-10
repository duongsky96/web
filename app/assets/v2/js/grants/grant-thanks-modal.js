Vue.component('contribution-thanks-modal', {
  delimiters: [ '[[', ']]' ],
  data: function() {
    return {
      modalId: 'contribution-thanks',
      imgURL: '',
      numberOfContributions: 0,
      donations: [],
      tweetUrl: ''
    };
  },
  mounted: function() {
    const checkoutData = CartData.loadCheckedOut();
    const shouldShow = checkoutData.length > 0;

    var grant_ids = ''
    for(var i=0; i<checkoutData.length;i++){
      grant_ids = grant_ids + checkoutData[i]['grant_id'] + ',';
    }

    this.imgURL = '/grants/cart_thumb/'+document.contxt['github_handle']+'/' + grant_ids;
    this.numberOfContributions = checkoutData.length;

    this.tweetUrl = `https://twitter.com/intent/tweet?text=I just funded ${this.numberOfContributions} grants on @gitcoin ${CartData.share_url()}`;

    if (shouldShow) {
      this.$bvModal.show(this.modalId);
    }

    this.donations = checkoutData;
  },
  methods: {
    close() {
      this.$bvModal.hide(this.modalId);
    },
    handleHide() {
      CartData.clearCheckedOut();
    },
    showSaveAsCollection() {
      this.$bvModal.show('create-collection');
    }
  }
});
