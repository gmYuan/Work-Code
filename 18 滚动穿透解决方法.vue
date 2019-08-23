
1 Q: 如何解决移动端滚动穿透问题

A:

https://www.cnblogs.com/ranyonsue/p/10763816.html

https://uedsky.com/2016-06/mobile-modal-scroll/




示例代码:



<script>
export default {
  watch: {
    showSku(val, oldVal) {
      // 监听showSku值，设置页面是否禁止滚动(滚动穿透问题)
      document.body.style.overflow = val ? "hidden" : "auto";
      document.querySelector("html").style.overflow = val ? "hidden" : "auto";

      document.body.style.height = val ? "100%" : "auto";
      document.querySelector("html").style.height = val ? "100%" : "auto";
    }
  }
}
</script>
