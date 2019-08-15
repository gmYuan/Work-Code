<template>
  <div>
    <!-- 页头部分 -->
    <div class="header-wrap">
      <layout-header
        :showBack="true"
      >
        <template v-slot:middle>
          <div class="title-wrap">
            {{courseDetail.title}}
          </div>
        </template>
      </layout-header>
    </div>

    <!-- 视频部分 -->
    <div>
      <video class="video-area" :src="src"  ref="video"  controls ></video>
    </div>

    <div style="width:100%;height:6px;background-color:rgba(245,245,245,1)"></div>

    <!-- 评分与简介 -->
    <div class="content-area">
      <div style="margin:5px auto auto 5px" class="score-wrap">
         <span class="txt">课程综合评价</span>
        <star :size="15" :score="score"></star>
      </div>
      <div class="course-intro">
        <span v-html="courseDetail.introduction"></span>
      </div>
    </div>

    <!-- 分割线 -->
    <div class="cut-off-line"></div>

    <!-- 课件 -->
    <div class="courseware-area">
      <div class="courseware">
        课件
      </div>
      <div>
        <courseware :coursewareList="coursewareList"></courseware>
      </div>
    </div>

    <!-- 底部 -->
    <div class="footer-wrap">
      <layout-footer>
        <template v-slot:left>
          <div class="flex-column" @click="showCommit()">
            <div class="footer-img commit bg"></div>
            <div class="footer-txt"> {{commentNum}} </div>
          </div>
        </template>

        <template v-slot:middle>
          <div class="flex-column" @click="toggleStatus('collection')">
            <span class="footer-img collection bg" :class="{collected: isCollection}"></span>
            <div class="footer-txt"> {{ collectionNum }}</div>
          </div>
        </template>

        <template v-slot:right>
          <div class="flex-column" @click="toggleStatus('good')">
            <span class="footer-img good bg" :class="{gooded: isPointPraise}"></span>
            <div class="footer-txt"> {{pointPraiseNum}} </div>
          </div>
        </template>
      </layout-footer>
    </div>

    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '70%' }"
    >
      <div class="popup-modal">
        <div style="padding: 0 0 55px 0">
          <div class="popup-modal-bar hot-commit-bar" v-show="hotCommentsList.length>0">
            <span>热评</span>
            <div class="close-icon" @click="closeComments()"></div>
          </div>
          <div class="hot-commit-content">
            <comments :commentsList="hotCommentsList" @changeZanStatus="getComments"></comments>
          </div>

          <div class="popup-modal-bar new-commit-bar" v-show="newCommentsList.length>0">
            <span>最新</span>
          </div>
          <div class="new-commit-content">
            <van-list
              v-model="loading"
              :finished="finished"
              @load="onLoad"
              :immediate-check="false"
              finished-text="没有更多评论了"
              :loading-text=" '' "
            >
              <comments :commentsList="newCommentsList" @changeZanStatus="getComments"></comments>
            </van-list>
          </div>

        </div>

        <div class="commit-area">
          <input type="text" placeholder="发表评论..." v-model="commentContent" @keyup.enter="submitComment">
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>

  /* 接口相关  */
  import {
    basicCourseStudyApi,
    collectionApi,
    giveThumbApi,
    hotReviewsApi,
    newReviewsApi,
    addReviewsApi,
    basicCourseStatusApi,

    commonCourseDetailApi,
    commonCourseStatusApi
  } from 'api'


  /*  组件相关  */
  import layoutHeader from '@/components/layout/LayoutHeader'
  import layoutFooter from '@/components/layout/LayoutFooter'
  import Star from '@/components/course/star'
  import Courseware from '@/components/courseware/courseware'
  import Comments from '@/components/comments/comments'

  export default {
    name: 'basicCourseStudy',

    data() {
      return {
        show: false,    // 是否显示 评论弹窗
        courseId: null,   // 当前课程id

        //课程信息数据
        courseDetail: {
          title: '',
          introduction: null,
        },

        src: '',      //视频地址
        score: 0,   // 课程评分

        //课件数据
        coursewareList: null,

        /* 页脚部分数据 */
        commentNum: 0,        // 评论数
        collectionNum: 0,     // 收藏数
        pointPraiseNum: 0,    // 点赞数
        isCollection: null,   // 是否已收藏
        isPointPraise: null,  // 是否已点赞

        /* 评论 */
        commentContent: '',    // 提交的评论内容
        hotCommentsList: [],   // 热门评论内容
        newCommentsList: [],   // 最新评论内容

        /* 更新学习状态相关 */
        status: null,         // 当前课程的学习状态

        /* 下拉加载评论相关 */
        currentPage: 1,     // 当前页数
        pageSize: 10,       // 每页的评论条数
        totalComments: 0,   // 所有评论数
        loading: false,     // 当前是否处于loading状态- 为真时 可发起数据请求
        finished: false     // 下拉列表是否已加载完所有数据

      }
    },
    components: {
      layoutHeader,
      layoutFooter,
      Star,
      Courseware,
      Comments
    },
    methods: {
      backPage() {
        this.$router.go(-1)
      },

      /* 获取课程详情 */
      async getDetail() {
        let {courseId, fromType} = this.$route.query
        let para = {courseId}
        let res
        let data
        // console.log('ty', typeof fromType)
        if (fromType == 0) {                        // 基础课程列表页 -详情
          res = await basicCourseStudyApi(para)
          data = res.data

        } else if (fromType == 1) {               // 公开课程列表页 -详情
          res = await commonCourseDetailApi(para)
          data = res.data
        }

        if (data) {
          this.courseId = data.courseId
          this.courseDetail.title = data.courseName
          this.courseDetail.introduction = data.details
          this.src = data.videoUrl
          this.score = data.score
          this.coursewareList = data.wareList
          this.commentNum = data.commentNum
          this.collectionNum = data.collectionNum
          this.pointPraiseNum = data.pointPraiseNum
          this.isCollection = data.isCollection
          this.isPointPraise = data.isPointPraise
          this.status = data.status
        }
      },


      /* 获取评论列表 */
      getComments() {
        let {courseId} = this.$route.query
        let hotParams = {courseId: courseId}
        hotReviewsApi(hotParams).then(res => {    // 热门评论
          // console.log('hot', res)
          this.hotCommentsList = res.data
        })

        this.getNewComments()   // 最新评论

      },
      /* 获取最新评论列表 */
      getNewComments() {
        this.loading = true
        let newParams = {pageIndex: this.currentPage, pageSize: this.pageSize}
        newReviewsApi(newParams).then(res => {
          let curLists = res.data.list          // 获取当前评论列表
          this.totalComments = res.data.totalCount

          if (this.newCommentsList.length !== 0) {
            this.newCommentsList = this.newCommentsList.concat(curLists)
          } else {
            this.newCommentsList = curLists
          }

          if (this.totalComments < (this.pageSize * this.currentPage)) {
            this.finished = true
          }

          this.currentPage = this.currentPage + 1
          this.loading = false                      // 数据加载完成后，不再处于loading状态
        })
      },

      onLoad () {          //简单节流
        let self = this
        setTimeout(self.getNewComments, 3000)
      },


      /* 切换收藏、点赞 */
      toggleStatus(type) {
        let para = {courseId: this.courseId}
        switch (type) {
          case 'collection':
            collectionApi(para).then( () => {
              this.isCollection = !this.isCollection
              if (this.isCollection) {
                this.collectionNum ++
              } else {
                this.collectionNum --
              }
            })
            break

          case 'good':
            giveThumbApi(para).then( () => {
              this.isPointPraise = !this.isPointPraise
              if (this.isPointPraise) {
                this.pointPraiseNum ++
              } else {
                this.pointPraiseNum --
              }
            })
            break
        }
      },

      /* 切换显示评论弹窗部分*/
      showCommit() {
        this.show = true;
      },
      closeComments() {
        this.show = false;
      },

      /* 提交评论部分*/
      submitComment(){
        let {courseId} = this.$route.query
        let params = {courseId: courseId, content: this.commentContent}
        addReviewsApi(params).then(res => {
          const toast = this.$createToast({
            txt: '评论成功',
            type: 'correct',
            time: 1000,
            zIndex: 2100
          })
          toast.show()
          this.commentContent = ''
          this.getComments()
        })
      },

      /* 更新学习状态为已学完 */
      getVideoStatus() {
        let video = this.$refs.video
        let {courseId, fromType} = this.$route.query
        video.addEventListener('ended', function (e) {
          let duration = (Math.floor(e.target.duration) * 1000 )
          let params = {courseId, status: 1, duration: duration}

          if (fromType == 0) {             // 基础课程学习状态更新
            basicCourseStatusApi(params)
          } else if (fromType == 1) {      // 公开课程学习状态更新
            commonCourseStatusApi(params)
          }
        })
      },

      /* 更新未学完的 学习状态 */
      updateStudyStatus () {
        if (this.status != 1) {          //还未学完时
          let {fromType} = this.$route.query
          let video = this.$refs.video
          let duration = (Math.floor(video.currentTime) * 1000)
          let params = {courseId: this.courseId , status: 2, duration: duration}
          if (fromType == 0) {                    // 基础课程学习状态更新
            return basicCourseStatusApi(params)
          } else if (fromType == 1) {            // 公开课程学习状态更新
            return commonCourseStatusApi(params)
          }
        } else {
          return new Promise( (resolve, reject) => {
            return resolve()
          })
        }
      }
    },

    created() {
      this.getDetail()
    },

    mounted() {
      this.getComments()
      this.getVideoStatus()
    },

    beforeRouteLeave(to,from,next){
      this.updateStudyStatus().then( () => {
          next()
      })
    },

  }
</script>

<style lang="stylus" scoped>
@import "~common/stylus/mixin.styl"
  // 头部样式
  .header-wrap
    // margin-bottom 19px
    width 100%
    background #fff
    .title-wrap
      min-width: 76px
      font-size: 19px
      line-height: 25px
      color: #000
      font-weight: 600
      text-align: center



  .video-area
    margin-top 21px
    margin-bottom 20px
    width 100%
    height 177px
    background-color #333

  .content-area
    padding 20px 20px
    .course-name
      margin-left 5px
      font-size 18px
      font-weight 550
      color rgba(51,51,51,1)
      line-height 25px
    .course-subtitle
      margin-left 5px
      margin-top 6px
      font-size 12px
      font-weight 400
      color rgba(192,192,192,1)
      line-height 16px

    .score-wrap
      display flex
      .txt
        display inline-block
        padding-right 6px
        font-size 16px
        line-height 22px
        color #333
        font-weight: 600

    .course-intro
      margin-top 15px
      font-size 14px
      font-weight 400
      color rgba(90,90,90,1)
      line-height 20px

  .cut-off-line
    margin 0 18px
    border-1px(rgba(245,245,245,1),1px,solid)

  .courseware-area
    padding: 17px 18px 70px 18px
    .courseware
      padding-left 6px
      height 27px
      border-left 3px solid #FBCF00
      font-size 16px
      font-weight 550
      color rgba(51,51,51,1)
      line-height 27px

  .footer-wrap
    .footer-img
      margin 6px 0 -6px
      width: 24px
      height: 24px
      &.commit
        bg-image('commit')

      &.collection
        bg-image('collection')
        &.collected
          bg-image('clickedCollect')

      &.good
        bg-image('good')
        &.gooded
          bg-image('clickedGood')

    .footer-txt
      color: #979797
      box-sizing: border-box
      text-align: center
      min-width: 40px
      line-height: 28px
      padding-left: 4px
      font-size 22px
      transform: scale(0.5)

  .popup-modal
    .popup-modal-bar
      width 100%
      height 40px
      background-color #F5F5F5
      display flex
      align-items center
      span
        margin-left 14px
        font-size 16px
        font-weight 550
        color rgba(51,51,51,1)
        line-height 40px
      .close-icon
        margin auto 14px auto auto
        width 24px
        height 24px
        background-Image url('assets/pubilc/close.png')
        background-position center
        background-repeat no-repeat
        background-size cover
    // .hot-commit-bar
    // .hot-commit-content
    // .new-commit-bar
    // .new-commit-content
    .commit-area
      position fixed
      left 0
      bottom 0
      width 100%
      height 49px
      background rgba(255,255,255,1)
      box-shadow 0px -1px 30px 0px rgba(215,215,215,0.8)
      text-align center
      line-height 49px
      input
        border-radius 18px
        width 90%
        height 35px
        background rgba(240,240,240,1)
        padding-left 20px
</style>

