<template>
  <div class="pagination">
    <button :disabled='pageNo==1' @click="getlastPage"  >上一页</button>
    <button v-show="startNumandEndNum.start>1" @click="$emit('getpageNo',1)" :class="{active: pageNo == 1}" >1</button>
    <button v-show="startNumandEndNum.start>2">···</button>
    
<!-- 中间部分 -->
    <button v-for="(page,index) in startNumandEndNum.end " :key="index" v-show="page >= startNumandEndNum.start" @click="$emit('getpageNo',page)" :class="{active: pageNo == page}" >{{page}} </button>
    
    <button v-show="startNumandEndNum.end<totalPage-1">···</button>
    <button v-show="startNumandEndNum.end<totalPage" @click="$emit('getpageNo',totalPage)" >{{totalPage}}</button>
    <button :disabled='pageNo==totalPage' @click="getprvePage" >下一页</button>
    
    <button style="margin-left: 30px">共{{this.total}}条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:['pageNo'  ,'pageSize' ,'total' ,'continues'],
    // 计算属性
    computed:{
        totalPage(){
            return  Math.ceil(this.total/this.pageSize)
        },
        startNumandEndNum(){
            const {pageNo,continues,totalPage} = this
            let start,end
            if(continues > totalPage){
                start = 1
                end = totalPage
            }
                start = pageNo - parseInt(continues/2)
                end = pageNo + parseInt(continues/2)
                // 异常页数的处理
                if(start<1){
                    start = 1
                    end = continues 
                }
                if(end > totalPage){
                    start = totalPage - continues + 1
                    end = totalPage
                }
            // 注意返回方式\
            return {start,end}
        }
    },
    methods:{
        getlastPage(){
            this.$emit('getpageNo',this.pageNo-1)
        },
        getprvePage(){
            this.$emit('getpageNo',this.pageNo+1)
        },
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>