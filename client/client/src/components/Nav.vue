<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link class="nav-link" exact-active-class="active" to="/">Home</router-link>
      </li>
      <!-- <li class="nav-item">
        <router-link class="nav-link" exact-active-class="active" to="/profile">Profile</router-link>
      </li> -->
      <li class="nav-item">
        <router-link class="nav-link" exact-active-class="active" to="/admin">Admin</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" exact-active-class="active" to="/advisor">Advisor</router-link>
      </li>
      <li class="nav-item">
          <router-link class="nav-link" exact-active-class="active" to="/register">Register</router-link>
      </li>
       <li class="nav-item">
          <router-link class="nav-link" exact-active-class="active" to="/login">Login</router-link>
      </li>
    </ul>
  </nav>
</template>
