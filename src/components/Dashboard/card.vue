<template>
  
    <div class="content">
      <img src="../../assets/icons/side-vitesse-light.svg" alt="">
      <p>Bonus</p>

     </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">

    .content {
    width: 50%;
    height: 20vh;
    background: #000;
    border-radius: 10px;
    display: flex;
    align-items:center ;
    justify-content: center;
    cursor: pointer;
    &:hover{
      background: #f16e01;

    }

    p{
      font-weight: bold;
      color: #fff;
      font-size: 20px;
      text-transform: uppercase;
      margin-top: 20px;
    }

  }
</style>