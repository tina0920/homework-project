<script setup lang="ts">
import gsap from 'gsap'
// 實際清單
const voiceData = reactive({
  lists: [
    {
      pic1: 'voice-m40-50.png',
      pic2: 'voice-balloon-nomeru.svg',
      name: 'W.Yさま',
      status: '50代 / 男性',
      content: '朝、水に溶かして一袋づつ飲んでいます！水にさっと溶けてくれるので飲みやすく、どことなく甘みを感じる味です。整腸作用が効いているのか毎日快便になってお腹もスッキリした気がします！続けてみようと思います。',
    }, {
      pic1: 'voice-w40-50.png',
      pic2: 'voice-balloon-haireru.svg',
      name: 'Y.Mさま',
      status: '40代 / 女性',
      content: '小分けのスプレーボトルにお水で溶かして持ち歩いています！泉質は、“硫酸塩泉”。「美人の湯」とも呼ばれるくらい美肌効果もあるそうで、皮膚にも優しく、保温効果やニキビなどの効果も！？温泉を持ち歩けるなんてとても豪華ですね。',
    }, {
      pic1: 'voice-w60.png',
      pic2: 'voice-balloon-tabereru.svg',
      name: 'S.Mさま',
      status: '60代 / 女性',
      content: 'ご飯を炊く際に、温泉パウダーを入れてみました。パウダーを入れたご飯、入れてないご飯を食べ比べてみると、パウダーを入れた方がお米の粒が際立っていて、また甘みも感じられ、ご飯が美味しかったです。',
    }, {
      pic1: 'voice-m40-50.png',
      pic2: 'voice-balloon-tabereru.svg',
      name: 'S.Eさま',
      status: '40代 / 男性',
      content: '米を研いで温泉パウダーを混ぜました。だまなどにはならずすっと水に溶けてくれて満遍なく成分が行き渡った印象。お米一粒一粒が立つというのだろうか？咀嚼のたびに米が程よくほぐれいつもよりもお米そのものの旨味を感じた。',
    }, {
      pic1: 'voice-m20-30.png',
      pic2: 'voice-balloon-nomeru.svg',
      name: 'ねこぽんさま',
      status: '20代 / 男性',
      content: '飲んだ感じは無味無臭で、どんな飲料・食べ物にも合いそうです。パッケージが可愛いので、プレゼントにも良いかも♪現地に足を運ばなくても自宅で、食べて・飲んで・入って楽しめるのはいいですね。まだ飲みはじめたばかりですが、送料の関係もあるので定期購入でお得に買えたらいいのにな〜って思いました。',
    }, {
      pic1: 'voice-w20-30.png',
      pic2: 'voice-balloon-nomeru.svg',
      name: 'O.Sさま',
      status: '20代 / 女性',
      content: '粉を一口舐めてみると、わたあめみたいにほんのりと甘くて美味しかったです。粉は、口で中でサラッと溶けていきました。白湯に溶かして飲んでも美味しく飲むことができました。',
    },
  ],
})

// Dom 渲染的清單 ＝ 實際清單*3
const voiceDataList = computed(() => {
  return voiceData.lists.concat(voiceData.lists, voiceData.lists)
})

// 進度條 相關
const progressbar = ref(null)
const progressbarWidth = 1 / voiceData.lists.length * 100
const progressbarX = ref(0)

const currentItem = ref(0) // 當前項目
const lastItem = ref(0) // 前一個項目
const moveX = ref(0)
const timeline = gsap.timeline()

// 回到第二輪的 第一個||最後一個
function backSecondList() {
  // 計算 第二輪的第一個||最後一個
  const secondItem = (currentItem.value % voiceData.lists.length) + voiceData.lists.length

  lastItem.value = currentItem.value
  currentItem.value = secondItem
  moveX.value = currentItem.value * -100

  // 回第二輪的第一個||最後一個
  timeline.set('.voiceList', { direction: 0, xPercent: moveX.value })
    .set(`.item${currentItem.value}`, { direction: 0, opacity: 1 }, '<')
    .set(`.item${lastItem.value}`, { direction: 0, opacity: 0.5 }, '<')
}

// 清單 位移
function moveVoiceListLis() {
  timeline.to('.progressbar', { direction: 1, scaleX: progressbarX.value, transformOrigin: '0%' })
    .to(`.item${currentItem.value}`, { direction: 0.3, opacity: 1 }, '<')
    .to(`.item${lastItem.value}`, { direction: 0.3, opacity: 0.5 }, '<')
    .to('.voiceList', { direction: 0.5, xPercent: moveX.value }, '<')

  // 如果是第一輪最後一個||第三輪第一個 => 彈回第二輪的第一個||最後一個
  if (currentItem.value === (voiceData.lists.length - 1) || currentItem.value === (voiceData.lists.length * 2))
    backSecondList()
}
// 切換當前項目
function changeVoiceItem(btn: number) {
  lastItem.value = currentItem.value
  currentItem.value += btn

  // 進度條
  const progressbarCurrent = currentItem.value % voiceData.lists.length
  progressbarX.value = progressbarCurrent >= 0 ? progressbarCurrent + 1 : progressbarCurrent + 7
  // 清單位移
  moveX.value = currentItem.value * -100

  moveVoiceListLis()
}

onMounted(() => {
  // 預設在第二輪第一個
  currentItem.value = voiceData.lists.length
  moveX.value = currentItem.value * -100

  timeline.to('.voiceList', { direction: 0.5, xPercent: moveX.value })
    .to(`.item${currentItem.value}`, { direction: 1, opacity: 1 }, '<')

  // 進度條 預設 寬度
  progressbar.value.style.width = `${progressbarWidth}%`
})
</script>

<template>
  <div class="slidPage">
    <div class="left">
      <div class="title">
        <h6>Voice</h6>
        <h3 mt>
          お客様の声
        </h3>
      </div>
    </div>
    <div class="right">
      <div class="voicListBox">
        <div class="voiceLists">
          <div v-for="(item, index) in voiceDataList" :key="item" class="voiceList " :class="`item${index}`">
            <img class="pic1" :src="`src/assets/images/${item.pic1}`" alt="">
            <img class="pic2" :src="`src/assets/images/${item.pic2}`" alt="">
            <h6 m-t-20px>
              {{ item.name }}
            </h6>
            <p m-t-5px m-b-15px font-bold>
              {{ item.status }}
            </p>
            <div class="content">
              {{ item.content }}
            </div>
          </div>
        </div>
      </div>
      <a class="arrowIcon" left--23px @click="changeVoiceItem(-1)"><div i-ion:chevron-back-outline c-white text-2xl /></a>
      <a class="arrowIcon" left-357px @click="changeVoiceItem(1)"><div i-ion:chevron-forward c-white text-2xl /></a>
      <div class="swiperPagination">
        <span ref="progressbar" class="progressbar" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slidPage{
  @apply pt-10 w-screen h-screen flex c-black truncate;
  background-image: url("../assets/images/bg.jpg");
  .left{
    @apply relative w-20% h-100%;

    &::before{
      @apply absolute w-90px h-330px inline-block left-0 content-empty bg-repeat-inherit;
      background-size: 30px;
      background-image: url("../assets/images/dot.svg");
    }
    .title {
      @apply ml-10 flex flex-col items-center;
      h6 {
        @apply c-white text-6;
      }
      h3 {
        @apply font-black write-vertical-left text-12;
      }
    }

  }
  .right {
    @apply relative w-80% h-100% flex flex-col justify-center;
    .voicListBox {
      @apply py-80px truncate;
      .voiceLists{
        @apply relative whitespace-nowrap;

        &::before {
          @apply absolute left-0  top-0 w-380px h-100% border-8px border-black content-empty ;
        }
        .voiceList {
          @apply relative w-380px max-w-380px opacity-50 inline-block py-50px px-45px v-start ;
          .pic1{
            @apply w-50% translate-x-50%;
          }
          .pic2{
            @apply absolute top-0 right-30% translate-x-50% translate-y--50% w-130px;
          }
          .content {
            @apply whitespace-pre-wrap ;
          }

        }
      }
    }
    .arrowIcon {
      @apply absolute top-50% translate-y--50% w-46px h-46px  text-center bg-black rounded-full cursor-pointer flex items-center justify-center;
      transition: background-color .25s ease 0s,border-color .25s ease 0s;
      &:hover {
        @apply bg-#f72f8d ;
      }

    }
    .swiperPagination {
      @apply w-100% h-4px bg-black;
      .progressbar {
        @apply h-100% bg-#f72f8d block;
      }
    }
  }
}
</style>
