<template>
  <div>
    <v-row id="firstRow">
      <v-col v-for="(pres, index) in presentation" :key="index" col="4">
        <v-container id="cube">
          <v-img
            class="imgFirstRow"
            :src="require(`../assets/images/${pres.img}`)"
          ></v-img>
          <h3 class="titlePres">{{ pres.title }}</h3>
          <p>{{ pres.text }}</p>
          <p>{{ pres.text2 }}</p>
          <v-btn :to="pres.to" :color="pres.open ? 'primary' : 'black'">{{
            pres.textBtn
          }}</v-btn>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'HomePres',
  data() {
    return {
      presentation: [
        {
          title: 'RENT',
          img: '001.png',
          text: 'Rent a game or more to play with your friends.',
          text2: 'Test the game before buying it. And enjoy🦄 !!',
          textBtn: 'RENT',
          open: true,
          to: '/game-list',
        },
        {
          title: 'BUY',
          img: '002.png',
          text: 'Buy a game to another player for less money.',
          text2: 'The solution for ecologic and less expensive board games !!',
          textBtn: 'COMING SOON',
          open: false,
          to: '/',
        },
        {
          title: 'ADOPT A GAME MASTER',
          img: '020.png',
          text: 'Some people love Unicorns 🦄.',
          text2:
            'Our Game Masters are the best in the world. And they are waiting for you.',
          textBtn: 'COMING SOON',
          open: false,
          to: '/',
        },
      ],
    }
  },
}
</script>
<style scoped lang="scss">
@import '@/design/_colors.scss';
#firstRow {
  #cube {
    width: 260px;
    height: 260px;
    border: 2px solid rgba(96, 93, 93, 0.41);
    box-shadow: rgba(209, 107, 5, 0.691) 0px 4px 12px;
    position: relative;
    text-align: center;
    border-radius: 5px 5px 5px 5px !important;
    text-align: center;
    margin-bottom: 20px;
    .imgFirstRow {
      height: 70px !important;
      width: 70px !important;
      position: absolute;
      top: -30px;
      left: 6rem;
    }
    p {
      margin-top: 10px;
      font-size: 14px;
    }
    .titlePres {
      margin-top: 40px;
      font-size: 18px;
    }
    .v-btn {
      margin-top: 20px;
      height: 50px !important;
      width: 140px !important;
      box-shadow: rgba(209, 107, 5, 0.691) 0px 4px 12px;
      border-radius: 20px 70px 35px 70px;
      transition: all 0.3s ease-in-out;
      cursor: pointer;
      &:hover {
        background-color: $color-secondary !important;
      }
    }
  }
}
</style>
