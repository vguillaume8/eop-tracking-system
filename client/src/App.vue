<template>
  <div class="flexible-content">
    <!--Navbar-->
    <mdb-navbar class="flexible-navbar white" light position="top" scrolling>
      <mdb-navbar-brand href="https://mdbootstrap.com/docs/vue/" target="_blank">EOP PILLARS</mdb-navbar-brand>
      <mdb-navbar-toggler>
        <mdb-navbar-nav left>
          <mdb-nav-item to="/" waves-fixed active class="active">Home</mdb-nav-item>
          <mdb-nav-item href="https://www.newpaltz.edu/eop/" target="_blank" waves-fixed>EOP Home</mdb-nav-item>
        </mdb-navbar-nav>
        <mdb-navbar-nav right>
          <mdb-nav-item href="https://www.facebook.com/EOP.at.SUNY.NewPaltz/" target="_blank" waves-fixed><mdb-icon fab class="text-black" icon="facebook-square"/></mdb-nav-item>
          <mdb-nav-item href="https://twitter.com/newpaltz" target="_blank" waves-fixed><mdb-icon fab icon="twitter"/></mdb-nav-item>
          <mdb-nav-item href="mailto:parkere@newpaltz.edu" waves-fixed class="border border-light rounded mr-1" target="_blank"><mdb-icon icon="envelope" class="mr-2"/>Email Us </mdb-nav-item>
          <mdb-nav-item href="tel:845-257-3220" waves-fixed class="border border-light rounded" target="_blank"><mdb-icon icon="phone" />Call Us</mdb-nav-item>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
    <!--/.Navbar-->
    <!-- Sidebar -->
    <div class="sidebar-fixed position-fixed">
      <a class="logo-wrapper"><img alt="" class="img-fluid" src="https://www.newpaltz.edu/media/identity/logos/newpaltzlogo.jpg"/></a>
      <mdb-list-group class="list-group-flush">
        <router-link to="/dashboard" @click.native="activeItem = 1">
          <mdb-list-group-item :action="true" :class="activeItem === 1 && 'active'"><mdb-icon icon="labtop" class="mr-3"/>Dashboard</mdb-list-group-item>
        </router-link>
        <router-link to="/profile" @click.native="activeItem = 2">
          <mdb-list-group-item :action="true" :class="activeItem === 2 && 'active'"><mdb-icon icon="user" class="mr-3"/>Profile</mdb-list-group-item>
        </router-link>
        <router-link to="/admin"  @click.native="activeItem = 3">
          <mdb-list-group-item :action="true" :class="activeItem === 3 && 'active'"><mdb-icon icon="table" class="mr-3"/>Admin</mdb-list-group-item>
        </router-link>
        <router-link to="/advisor"  @click.native="activeItem = 4">
          <mdb-list-group-item :action="true" :class="activeItem === 4 && 'active'"><mdb-icon icon="clipboard-check" class="mr-3"/>Advisor</mdb-list-group-item>
        </router-link>
        <router-link to="/progression" @click.native="activeItem = 5">
          <mdb-list-group-item :action="true" :class="activeItem === 5 &&  'active'"><mdb-icon icon="spinner" class="mr-3"/>Progression</mdb-list-group-item>
        </router-link>
        <a class="btn btn-sm btn-danger logout" v-if="login" v-on:click="logout">Logout</a>
      </mdb-list-group>
    </div>
    <!-- /Sidebar  -->
    <main>
      <div class="mt-5 p-5">
        <router-view></router-view>
      </div>
      <ftr color="primary-color-dark" class="text-center font-small darken-2">
        <div class="pt-4">
          <mdb-btn outline="white" tag="a" @click.native="downloadFile('pillar-img')" >Pillar Description (READ ONLY)<mdb-icon icon="download" class="ml-2"/></mdb-btn>
          <mdb-btn outline="white" tag="a" @click.native="downloadFile('pillar-word')">Pillar Description (Editable) <mdb-icon icon="download" class="ml-2"/></mdb-btn>
        </div>
        <hr class="my4"/>
        <div class="pb-4">
          <a href="https://www.facebook.com/EOP.at.SUNY.NewPaltz/" target="_blank"><mdb-icon fab icon="facebook-square" class="mr-3"/></a>
          <a href="https://twitter.com/newpaltz" target="_blank"><mdb-icon fab icon="twitter" class="mr-3"/></a>
          <a href="https://www.linkedin.com/groups/156076/" target="_blank"><mdb-icon fab icon="linkedin" class="mr-3"/></a>
        </div>
        <p class="footer-copyright mb-0 py-3 text-center">
          &copy; {{new Date().getFullYear()}} Copyright: <a href=""> </a>
        </p>
      </ftr>
    </main>
  </div>
</template>

<script>
/* eslint-disable */
import { mdbContainer, mdbNavbar, mdbNavbarBrand, mdbNavItem, mdbNavbarNav, mdbNavbarToggler, mdbBtn, mdbIcon, mdbListGroup, mdbListGroupItem, mdbCardBody, mdbFooter, waves } from 'mdbvue'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import api from '../configs/dev.config.js';
import axios from 'axios';


export default {
  name: 'AdminTemplate',
  components: {
    mdbContainer,
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavItem,
    mdbNavbarNav,
    mdbNavbarToggler,
    mdbBtn,
    mdbListGroup,
    mdbListGroupItem,
    mdbIcon,
    mdbCardBody,
    'ftr': mdbFooter,
    Dashboard,
    Profile
  },
  data () {
    return {
      activeItem: 1,
      login: true
    }
  },
  beforeMount () {
    this.activeItem = this.$route.matched[0].props.default.page
  },
   methods: {
    logout(){
      this.$forceUpdate();
      localStorage.removeItem('user');
      localStorage.removeItem('jwt');
      this.$router.push('/login');
      //location.reload();
    },

    downloadFile(file){
       axios({
          method: 'get',
          url: `${api.api}/download/file/${file}`,
          responseType: 'arraybuffer',

        }).then(function(response) {
            let blob = new Blob([response.data], { type: 'application/pdf' })
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = 'PILLAR.zip'
            link.click()
          })
    }
  },
  mixins: [waves]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
  background-color: #EDEDEE;
}

.flexible-content {
  transition: padding-left 0.3s;
  padding-left: 270px;
}

.flexible-navbar {
  transition: padding-left 0.5s;
  padding-left: 270px;
}

.sidebar-fixed {
  left: 0;
  top: 0;
  height: 100vh;
  width: 270px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  z-index: 1050;
  background-color: #fff;
  padding: 1.5rem;
  padding-top: 0;
}

.sidebar-fixed .logo-wrapper img{
  width: 100%;
  padding: 2.5rem;
}

.sidebar-fixed .list-group-item {
  display: block !important;
  transition: background-color 0.3s;
}

.sidebar-fixed .list-group .active {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  border-radius: 5px;
}

@media (max-width: 1199.98px) {
  .sidebar-fixed {
    display: none;
  }
  .flexible-content {
    padding-left: 0;
  }
  .flexible-navbar {
    padding-left: 10px;
  }
}
</style>
<style>
.navbar-light .navbar-brand {
  margin-left: 15px;
  color: #2196f3 !important;
  font-weight: bolder;
}
</style>
