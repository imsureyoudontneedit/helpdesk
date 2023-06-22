async function refreshToken(){
            const vm = this
            this.user = await axios.post('http://banaworld.ru:5003/Auth/api/Auth/Refresh/', this.$cookies.get('refreshUserToken'),
              {headers: {
                    'Content-Type': 'application/json'
                }}
              )
            .then((response) => {
              vm.$cookies.set("accessUserToken", response.data.accessToken)
            });
            this.startRefreshTokenTimer();
};
function startRefreshTokenTimer() {
              const jwtBase64 = this.$cookies.get('accessUserToken').split('.')[1];
              const jwtToken = JSON.parse(atob(jwtBase64));
              this.expires = jwtToken.exp * 1000;
              
};