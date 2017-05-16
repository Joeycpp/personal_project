var register = {

	init:function(){
		//个人注册 填写时对值进行判断
		register.check_fill_in();
		//企业注册 填写时对值进行判断
		register.check_fill_in_b();
		//个人注册 获取手机验证码 
		$("#send_code").on('click', function(){
			register.send_code();
		});
		//企业注册 获取手机验证码
		$("#send_code_b").on('click', function(){
			register.send_code_b();
		});
		//提交审核时判断填写的值
		$("#submit-btn").click(function(){
			register.submit_pre();
		});
		
	},

	//企业注册 检查填写时的值,光标离开后触发事件
	check_fill_in_b:function(){
		//光标点击进入时
		$('#b_account').focus(function(){
			$('#b_account').next().text('*');
		});
		//光标离开后
		$('#b_account').blur(function(){
			var b_account;
			b_account = $('#b_account').val();
			if ( b_account == '') {
				return false;
			}

			var b_account_reg = /^[0-9a-zA-Z]{6,18}$/;
			if ( !b_account_reg.exec(b_account) ){
				$('#b_account').next().text('用户名格式错误！');
				return false;
			}
			$.ajax({
            'url': '/login/check_account_name',
            'dataType': 'json',
            'type': 'post',
            'data': {
                'account_name': b_account
            },
            'success': function(response){
                if(response.ok){
                	// alert('发送成功');
                	$('#b_account').next().text('恭喜你，该用户名可以注册！');
                	$('#account_repeat_b').val('no_repeat');
                }else{
                	$('#b_account').next().text('遗憾，该用户名已经被占用！');
                	$('#account_repeat_b').val('repeat');
                }
	            }
	        });
			// alert( p_account );
		});
	},

	// 个人注册 检查填写时的值,光标离开后触发事件
	check_fill_in:function(){
		//光标点击进入时
		$('#p_account').focus(function(){
			$('#p_account').next().text('*');
		});
		//光标离开后
		$('#p_account').blur(function(){
			var p_account;
			p_account = $('#p_account').val();
			if ( p_account == '') {
				return false;
			}

			var p_account_reg = /^[0-9a-zA-Z]{6,18}$/;
			if ( !p_account_reg.exec(p_account) ){
				$('#p_account').next().text('用户名格式错误！');
				return false;
			}
			$.ajax({
            'url': '/login/check_account_name',
            'dataType': 'json',
            'type': 'post',
            'data': {
                'account_name': p_account
            },
            'success': function(response){
                if(response.ok){
                	// alert('发送成功');
                	$('#p_account').next().text('恭喜你，该用户名可以注册！');
                	$('#account_repeat').val('no_repeat');
                }else{
                	$('#p_account').next().text('遗憾，该用户名已经被占用！');
                	$('#account_repeat').val('repeat');
                }
	            }
	        });
			// alert( p_account );
		});
	},

	//个人
	send_code:function(){
		var p_mobile_number;
		p_mobile_number = $('#p_mobile_number').val();
		if ( p_mobile_number == '') {
			alert('请先填写手机号码！');
			return false;
		}

		var p_mobile_number_reg = /^(1(([35][0-9])|(47)|[8][01236789]))\d{8}$/;
		if ( !p_mobile_number_reg.exec(p_mobile_number) ){
			alert('手机号格式错误！');
			return false;
		}

		$("#send_code").off('click');
		$.ajax({
            'url': '/login/send_mobile_memo',
            'dataType': 'json',
            'type': 'post',
            'data': {
                'mobile_number': p_mobile_number
            },
            'success': function(response){
                if(response.ok){
                	// alert('发送成功');
                	$('#send_code').html('发送成功');
                	//120秒倒计时
                	register.countdown();
                	
                    
                }else{
                	alert('发送失败');


                    $("#send_code").on('click', function(){
                		register.send_code();
                	});
                }
            }
        });

	},

	//60秒倒计时
	countdown:function(){
		setTimeout(function(){
            var time = 60;
            var t = setInterval(function(){
                time--;
                if(time == 0){
                    clearInterval(t);
                    $('#send_code').html('发送验证码');
                    $("#send_code").on('click', function(){
                		register.send_code();
                	});

                }else{
                	$('#send_code').html(time + '秒');

                }
            }, 1000);
        }, 1000);
	},

	//企业
	send_code_b:function(){
		var b_mobile_number;
		b_mobile_number = $('#b_mobile_number').val();
		if ( b_mobile_number == '') {
			alert('请先填写手机号码！');
			return false;
		}

		var b_mobile_number_reg = /^(1(([35][0-9])|(47)|[8][01236789]))\d{8}$/;
		if ( !b_mobile_number_reg.exec(b_mobile_number) ){
			alert('手机号格式错误！');
			return false;
		}

		$("#send_code_b").off('click');
		$.ajax({
            'url': '/login/send_mobile_memo',
            'dataType': 'json',
            'type': 'post',
            'data': {
                'mobile_number': b_mobile_number
            },
            'success': function(response){
                if(response.ok){
                	// alert('发送成功');
                	$('#send_code_b').html('发送成功');
                	//120秒倒计时
                	register.countdown_b();
                	
                    
                }else{
                	alert('发送失败');


                    $("#send_code_b").on('click', function(){
                		register.send_code_b();
                	});
                }
            }
        });

	},

	//企业 60秒倒计时
	countdown_b:function(){
		setTimeout(function(){
            var time = 60;
            var t = setInterval(function(){
                time--;
                if(time == 0){
                    clearInterval(t);
                    $('#send_code_b').html('发送验证码');
                    $("#send_code_b").on('click', function(){
                		register.send_code_b();
                	});

                }else{
                	$('#send_code_b').html(time + '秒');

                }
            }, 1000);
        }, 1000);
	},

	//提交前再对值进行判断
	submit_pre:function(){
		//个人&企业
		var user_type;
		user_type = $('#r_type').val();
		if(user_type == 'personal'){
			//个人注册
			register.submit_pre_personal();
		}
		else if(user_type == 'business'){
			//企业注册
			register.submit_pre_business();
		}
	},

	//企业注册
	submit_pre_business:function(){
		var pic_url = $('#pic_url').val();
		var account_repeat_b = $('#account_repeat_b').val();
		var b_account = $('#b_account').val();
		var b_pwd = $('#b_pwd').val();
		var b_pwd_repeat = $('#b_pwd_repeat').val();
		var b_uniform_code = $('#b_uniform_code').val();
		var b_uniform_user = $('#b_uniform_user').val();
		var b_license_no = $('#b_license_no').val();
		var b_contact_name = $('#b_contact_name').val();
		var b_mobile_number = $('#b_mobile_number').val();
		var b_verification_code = $('#b_verification_code').val();

		//匹配规则
		var b_account_reg = /^[0-9a-zA-Z]{6,18}$/;
		var b_pwd_reg = /^[0-9a-zA-Z]{6,18}$/;
		// var b_credential_no_reg = /(^\d{15}$)|(\d{17}(?:\d|x|X)$)/;
		var b_mobile_number_reg = /^(1(([35][0-9])|(47)|[8][01236789]))\d{8}$/;
		if ( pic_url == '') {
			alert('请上传营业执照副本！');
			return false;
		}

		if ( b_account == '') {
			alert('用户名不能为空');
			return false;
		}

		if ( b_pwd == '') {
			alert('登录密码不能为空');
			return false;
		}

		if ( b_pwd_repeat == '') {
			alert('确认登录密码不能为空');
			return false;
		}

		if ( b_uniform_code == '') {
			alert('统一社会信用代码不能为空');
			return false;
		}

		if ( b_uniform_user == '') {
			alert('法定代表人不能为空');
			return false;
		}

		if ( b_license_no == '') {
			alert('营业执照号码不能为空');
			return false;
		}

		if ( b_contact_name == '') {
			alert('联系人不能为空');
			return false;
		}

		if ( b_mobile_number == '') {
			alert('手机号码不能为空');
			return false;
		}

		if ( b_verification_code == '') {
			alert('验证码不能为空');
			return false;
		}

		if (b_pwd !== b_pwd_repeat) {
			alert('登录密码与确认登录密码不同！');
			return false;
		}

		if ( !b_account_reg.exec(b_account) ){
			alert('用户名格式错误！');
			return false;
		}

		if ( !b_pwd_reg.exec(b_pwd) ){
			alert('密码格式错误！');
			return false;
		}

		if ( !b_mobile_number_reg.exec(b_mobile_number) ){
			alert('手机号格式错误！');
			return false;
		}

		//验证用户名是否重复
		if ( account_repeat_b == 'repeat' ) {
			alert('遗憾，该用户名已经被占用！');
			return false;
		}

		//验证成功，发送请求
		$.ajax({
            'url': '/login/register_user_business',
            'dataType': 'json',
            'type': 'post',
            'data': {
            	'pic_url': pic_url,
                'b_account': b_account,
                'b_pwd': b_pwd,
                'b_uniform_code': b_uniform_code,
                'b_uniform_user': b_uniform_user,
                'b_license_no': b_license_no,
                'b_contact_name': b_contact_name,
                'b_mobile_number': b_mobile_number,
                'b_verification_code': b_verification_code
            },
            'success': function(response){
                if(response.ok){

            		$(".sub-detail01").css('display','none'); 
			        $(".sub-detail02").css('display','none');
			        $(".sub-detail03").css('display','block');
                }else{
                	alert(response.message);
                }
	            }
	        });

		return true;


	},

	//个人注册
	submit_pre_personal:function(){
		var account_repeat = $('#account_repeat').val();
		var p_account = $('#p_account').val();
		var p_pwd = $('#p_pwd').val();
		var p_pwd_repeat = $('#p_pwd_repeat').val();
		// var p_credential_type = $('#p_credential_type').val();
		var p_credential_no = $('#p_credential_no').val();
		var p_mobile_number = $('#p_mobile_number').val();
		var p_verification_code = $('#p_verification_code').val();

		//匹配规则
		var p_account_reg = /^[0-9a-zA-Z]{6,18}$/;
		var p_pwd_reg = /^[0-9a-zA-Z]{6,18}$/;
		var p_credential_no_reg = /(^\d{15}$)|(\d{17}(?:\d|x|X)$)/;
		var p_mobile_number_reg = /^(1(([35][0-9])|(47)|[8][01236789]))\d{8}$/;
		if ( p_account == '') {
			alert('用户名不能为空');
			return false;
		}

		if ( p_pwd == '') {
			alert('登录密码不能为空');
			return false;
		}

		if ( p_pwd_repeat == '') {
			alert('确认登录密码不能为空');
			return false;
		}

		if ( p_credential_no == '') {
			alert('证件号不能为空');
			return false;
		}

		if ( p_mobile_number == '') {
			alert('手机号码不能为空');
			return false;
		}

		if ( p_verification_code == '') {
			alert('验证码不能为空');
			return false;
		}

		if (p_pwd !== p_pwd_repeat) {
			alert('登录密码与确认登录密码不同！');
			return false;
		}

		if ( !p_account_reg.exec(p_account) ){
			alert('用户名格式错误！');
			return false;
		}

		if ( !p_pwd_reg.exec(p_pwd) ){
			alert('密码格式错误！');
			return false;
		}

		if ( !p_credential_no_reg.exec(p_credential_no) ){
			alert('证件号格式错误！');
			return false;
		}

		if ( !p_mobile_number_reg.exec(p_mobile_number) ){
			alert('手机号格式错误！');
			return false;
		}

		//验证用户名是否重复
		if ( account_repeat == 'repeat' ) {
			alert('遗憾，该用户名已经被占用！');
			return false;
		}

		//验证成功，发送请求
		$.ajax({
            'url': '/login/register_user_personal',
            'dataType': 'json',
            'type': 'post',
            'data': {
                'p_account': p_account,
                'p_pwd': p_pwd,
                'p_credential_no': p_credential_no,
                'p_mobile_number': p_mobile_number,
                'p_verification_code': p_verification_code
            },
            'success': function(response){
                if(response.ok){

            		$(".sub-detail01").css('display','none'); 
			        $(".sub-detail02").css('display','none');
			        $(".sub-detail03").css('display','block');
                }else{
                	alert(response.message);
                }
	            }
	        });

		return true;


	},

	
};