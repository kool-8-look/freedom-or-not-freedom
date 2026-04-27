$(document).ready(function () {
    try {
        if (typeof $ === 'undefined') {
            return;
        }

        // 检查waifu元素是否存在
        if ($('.waifu').length === 0) {
            return;
        }

        $("<link>").attr({ href: "live2D/waifu.css?v=1.4.2", rel: "stylesheet", type: "text/css" }).appendTo('head');

        // 直接使用已加载的脚本，不需要 AJAX
        /* 可直接修改部分参数 */
        live2d_settings['hitokotoAPI'] = "hitokoto.cn";  // 一言 API
        live2d_settings['modelStorage'] = false;         // 不储存模型 ID
        live2d_settings['showToolMenu'] = true;          // 显示工具栏
        live2d_settings['homePageUrl'] = '/home';        // 首页地址
        // waifuSize 由 waifu-tips.js 自动处理，不需要在这里设置

        // 使用简化版本，避免 JSON 格式问题
        window.waifuTipsData = {
            "waifu": {
                "console_open_msg": ["哈哈，你打开了控制台，是想要看看我的秘密吗？"],
                "copy_message": ["你都复制了些什么呀，转载要记得加上出处哦"],
                "screenshot_message": ["照好了嘛，是不是很可爱呢？"],
                "hidden_message": ["我们还能再见面的吧…"],
                "load_rand_textures": ["我还没有其他衣服呢", "我的新衣服好看嘛"],
                "hour_tips": {
                    "t5-7": ["早上耗!!不是这才几点!起这么早要干哈!"],
                    "t7-11": ["上午嚎!没事起来走走。"],
                    "t11-12": ["中午了，工作了一个上午，现在是午餐时间！"],
                    "t12-15": ["现在是摸鱼时间!!!!嗷呜~~"],
                    "t15-17": ["又又又一下午过去了呢!"],
                    "t17-19": ["傍晚了!窗外夕阳的景色很美丽欸,靓仔,你瞅的见嘛"],
                    "t19-21": ["晚上好,靓仔今天过得怎么样啊?"],
                    "t21-23": ["都已经这么晚了，早点休息吧,明天是个美好的一天,晚安靓仔~"],
                    "t23-5": ["你这是夜猫子啊?这么晚还不滚去睡觉,明天要变异成僵尸啊?"],
                    "default": ["嗨~ 快来逗我玩吧！"]
                }
            },
            "mouseover": [
                { "selector": ".fui-home", "text": ["点击前往首页，想回到上一页可以使用浏览器的后退功能哦"] },
                { "selector": ".fui-chat", "text": ["一言一语，一颔一笑。一字一句，一颗赛艇。"] },
                { "selector": ".fui-eye", "text": ["嗯··· 要切换 看板娘 吗？"] },
                { "selector": ".fui-user", "text": ["喜欢换装 Play 吗？"] },
                { "selector": ".fui-photo", "text": ["要拍张纪念照片吗？"] },
                { "selector": ".fui-info-circle", "text": ["这里有关于我的信息呢"] },
                { "selector": ".fui-cross", "text": ["你不喜欢我了吗..."] },
                { "selector": ".waifu #live2d", "text": ["干嘛呢你，快把手拿开", "鼠…鼠标放错地方了！"] }
            ],
            "click": [
                { "selector": ".waifu #live2d", "text": ["是…是不小心碰到了吧", "干哈呢你！", "现在几点了?该下班了吧", "你会不会单手翻?", "萝莉控是什么呀", "你看到我的小熊了吗", "再摸的话我可要报警了！⌇●﹏●⌇"] }
            ]
        };

        /* 在 initModel 前添加 */
        // initModel 将在 index.html 中调用，这里不再重复调用
    } catch (err) {
    }
});