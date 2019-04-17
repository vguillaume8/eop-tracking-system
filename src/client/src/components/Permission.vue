<template>
  <section id="bad-gateway">
    <div class="full">
      <mdb-row class="bad-gateway-row">
        <mdb-col md="8">
          <img alt="Error 403" class="img-fluid" hieght="20px" src="https://upload.wikimedia.org/wikipedia/en/e/ed/SUNY_New_Paltz_Square_Logo.png"/>
          <h2 class="h2-responsive mt-3 mb-2">403. That's an error.</h2>
          <h4>You do not have permission to access this page.</h4>
        </mdb-col>
        <mdb-col md="4">
          <img alt="Error 403" class="img-fluid" src="https://mdbootstrap.com/img/Others/grafika404-bf.png"/>
        </mdb-col>
      </mdb-row>
    </div>
  </section>
</template>

<script>
import { mdbRow, mdbCol } from 'mdbvue'

export default {
  name: 'Permission',
  components: {
    mdbRow,
    mdbCol
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.full {
  height: 70vh;
}
.bad-gateway-row {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 55%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
