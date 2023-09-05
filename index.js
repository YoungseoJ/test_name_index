var test = new Vue({
    el: '#test',
    data: {
      intro: '신체활동 준비를 위해 건강 실천 목표 서약서 작성하러 가기!',
      title: '건강 실천 목표 서약서',        
      currentIndex: 0, // index 에서 이름 변경
      qna: [], // 새로 선언, question[], answer[], selection[] 제거
      result: '',
    },

    beforeMount: function() {
        this.insertQna('1. 나는 하루에 _____분씩 걸을 것이다.', null, 'text');
        this.insertQna('2. 나는 내가 좋아하는 활동 중, _______을(를) 더욱 자주, 더욱 활발하게 할 것이다.', null, 'text');
        this.insertQna('3. 나는 신체활동을 습관화하기 위해 최선을 다할 것이다.', ['네'], null);
        this.insertQna('4. 나는 이를 ____년 ___월 ___일부터 반드시 실천할 것이다.', null,'text');
        this.insertQna('5. 귀하의 성함을 적어주세요.', null, 'text');
    },

    
    mounted: function() {
      $('#intro').show();
      $('#main').hide();
      $('#result').hide();
    },
    
    methods: {
        insertQna: function(q,a,t) {
            var item = {
                q: q,
                a: a,
                r: '', 
                t: t
            };
            this.qna.push(item);
        }, 

      start: function() {
        $('#intro').hide();
        $('#main').show();
        $('#result').hide();

        var self = this;
        setTimeout(function() {
            if(typeof self.qna[0].t != 'undefined' && self.qna[0].t != null) {
                $('#q0a0').attr('type', self.qna[0].t);
                $('#q0a0').focus();
            }
        }, 200);
      },
      
      next: function () {
        var self = this;
        if(this.currentIndex < this.qna.length-1) {
            this.currentIndex++;
            if(typeof this.qna[this.currentIndex].t != 'undefined' && this.qna[this.currentIndex].t != null) {
                setTimeout(function() {
                    $('#q'+self.currentIndex+'a0').attr('type', self.qna[self.currentIndex].t);
                    $('#q'+self.currentIndex+'a0').focus();
                }, 200);
            }
        } else {
            var check = true; 
            for(var i=0; i < this.qna.length; i++) {
                if(this.qna[i].r === '') {
                    check = false;
                }
            }
            if(check) {
                this.showResult();
            } else {
                alert("아직 완료되지 않았습니다.");
            }
        }

      },




      prev: function() {
        var self = this;
        if(this.currentIndex > 0) {
            this.currentIndex--;
            if(typeof this.qna[this.currentIndex].t != 'undefined' && this.qna[this.currentIndex].t != null) {
                setTimeout(function() {
                    $('#q'+self.currentIndex+'a0').attr('type', self.qna[self.currentIndex].t);
                    $('#q'+self.currentIndex+'a0').focus();
                }, 200);                    
            }
        } else {
            alert('첫 질문입니다.');
        }},

        showResult: function() {
            this.result =  '나는 하루에 '+this.qna[0].r+'분씩 걸을 것이다.\n\n';
            this.result += '나는 내가 좋아하는 활동 중, '+this.qna[1].r+'을(를) 더욱 자주, 더욱 활발하게 할 것이다.\n\n';
            this.result += '나는 신체활동을 습관화하기 위해 최선을 다할 것이다.\n\n';
            this.result += '나는 이를 '+this.qna[3].r+'부터 반드시 실천할 것이다.\n\n\n\n\n';
            this.result += ''+this.qna[4].r+' 인'
            $('#main').hide();
            $('#result').show();
        }
    }

});



$(document).ready(function(){
    var now = new Date();
    $("p").eq(0).text(now); //전체

    var year=now.getFullYear();//연도
    $("p").eq(1).text(year); 

    var month=now.getMonth()+1;//월
    $("p").eq(2).text(month);

    var date=now.getDate();//일
    $("p").eq(3).text(date);

    var day=now.getDay();//요일
    $("p").eq(4).text(day);

    var hr=now.getHours();//시간
    $("p").eq(5).text(hr);

    var min=now.getMinutes();//분
    $("p").eq(6).text(min);

    var sec=now.getSeconds();//초
    $("p").eq(7).text(sec);


  });
