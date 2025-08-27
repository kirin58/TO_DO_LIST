<script>
import NavBar from '@/components/NavBar.vue';
import PomoLayout from '@/components/Pomo/PomoLayout.vue';
import Pomoright from '@/components/Pomo/Pomoright.vue';

export default {
  components: { PomoLayout, Pomoright ,NavBar  },
  data() {
    return {
      sessions: JSON.parse(localStorage.getItem("sessions") || "[]")
    };
  },
  methods: {
    addSession(session) {
      this.sessions.push(session);
      localStorage.setItem("sessions", JSON.stringify(this.sessions));
    }
  }
}
</script>
<template>
    <body class="w-screen flex flex-row">
        <NavBar />
        <PomoLayout @pomo-ended="addSession" />
        <Pomoright :pomoSessions="sessions" />
    </body>

</template>


