var ostore_utils = (function (exports) {
    'use strict';

    /*
     * @Author: wyh-code <578311720@qq.com>
     * @Date: 2023-12-18 15:56:53
     * @LastEditors: wyh-code<578311720@qq.com>
     * @LastEditTime: 2023-12-18 15:56:53
     * @Description: 时间操作相关工具函数
     */
    function formatDate() {
        console.log('format date');
    }

    /*
     * @Author: wyh-code <578311720@qq.com>
     * @Date: 2023-12-18 15:56:53
     * @LastEditors: wyh-code<578311720@qq.com>
     * @LastEditTime: 2023-12-18 15:56:53
     * @Description: 文件操作相关工具函数
     */
    var downloadFile = function (url, label) {
        return fetch(url)
            .then(function (response) { return response.blob(); })
            .then(function (response) {
            var blob = new Blob([response]);
            var link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = label;
            link.click();
            URL.revokeObjectURL(link.href);
            return {
                status: true
            };
        })
            .catch(function (err) {
            return {
                status: false,
                message: err.message
            };
        });
    };

    /*
     * @Author: wyh-code <578311720@qq.com>
     * @Date: 2023-12-18 15:56:53
     * @LastEditors: wyh-code<578311720@qq.com>
     * @LastEditTime: 2023-12-18 15:56:53
     * @Description: 格式化相关工具函数
     */
    function format() {
        console.log('format');
    }

    function __spreadArray(to, from, pack) {
      if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
      return to.concat(ar || Array.prototype.slice.call(from));
    }
    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
      var e = new Error(message);
      return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    /*
     * @Author: wyh-code <578311720@qq.com>
     * @Date: 2023-12-18 15:56:53
     * @LastEditors: wyh-code<578311720@qq.com>
     * @LastEditTime: 2023-12-18 15:56:53
     * @Description: 数学计算相关工具函数
     */
    var compute = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        // 计算放大倍数
        var getPower = function (numbers) {
            var lens = numbers.map(function (num) { var _a; return ((_a = num.toString().split(".")[1]) === null || _a === void 0 ? void 0 : _a.length) || 0; });
            // 获取最大长度
            var len = Math.max.apply(Math, lens);
            // 计算返回放大倍数
            return Math.pow(10, len);
        };
        // 获取放大倍数
        var power = getPower(args);
        // 获取放大后的值
        var newNumbers = args.map(function (num) { return Math.round(num * power); });
        // 计算结果
        var result = 0;
        switch (type) {
            case "+":
                result = newNumbers.reduce(function (preNumber, nextNumber) { return preNumber + nextNumber; }, result) / power;
                break;
            case "-":
                result = newNumbers.reduce(function (preNumber, nextNumber) { return preNumber - nextNumber; }) / power;
                break;
            case "*":
                result = newNumbers.reduce(function (preNumber, nextNumber) { return preNumber * nextNumber; }) / (Math.pow(power, newNumbers.length));
                break;
            case "/":
                result = newNumbers.reduce(function (preNumber, nextNumber) { return preNumber / nextNumber; });
                break;
        }
        return {
            result: result,
            next: function (nextType) {
                var nextArgs = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    nextArgs[_i - 1] = arguments[_i];
                }
                return compute.apply(void 0, __spreadArray([nextType, result], nextArgs, false));
            }
        };
    };

    /*
     * @Author: wyh-code <578311720@qq.com>
     * @Date: 2023-12-18 15:56:53
     * @LastEditors: wyh-code<578311720@qq.com>
     * @LastEditTime: 2023-12-18 15:56:53
     * @Description: localStorage、cookie 相关工具函数
     */
    var getCookies = function (name) {
        var obj = document.cookie.split(';').reduce(function (map, str) {
            map[str.split('=')[0].trim()] = str.split('=')[1].trim();
            return map;
        }, {});
        return name ? obj[name] : obj;
    };

    /*
     * @Author: wyh-code <578311720@qq.com>
     * @Date: 2023-12-18 15:56:53
     * @LastEditors: wyh-code<578311720@qq.com>
     * @LastEditTime: 2023-12-18 15:56:53
     * @Description: url 相关工具函数
     */
    var getUrlParams = function (key) {
        var url = new URL(window.location.href);
        var params = Object.fromEntries(new URLSearchParams(url.search));
        return key ? params[key] : params;
    };
    var setSearchParams = function (query) {
        var url = new URL(window.location.href);
        var params = new URLSearchParams(url.search);
        for (var key in query) {
            params.set(key, query[key]);
        }
        url.search = params.toString();
        history.pushState({ url: url.href, title: document.title }, document.title, url.href);
    };
    var packUrlParams = function (params) {
        if (params === void 0) { params = {}; }
        var query = '';
        for (var key in params) {
            query += "".concat(key, "=").concat(params[key], "&");
        }
        return query.slice(0, -1);
    };
    var dataURItoBlob = function (dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        var blob = new Blob([ab], { type: mimeString });
        return blob;
    };

    /*
     * @Author: wyh-code <578311720@qq.com>
     * @Date: 2023-12-18 15:56:53
     * @LastEditors: wyh-code<578311720@qq.com>
     * @LastEditTime: 2023-12-18 15:56:53
     * @Description: 其他相关工具函数
     */
    var copy = function (text, callback) {
        if (text) {
            var input = document.createElement('input');
            input.setAttribute('readonly', 'readonly');
            input.setAttribute('value', text);
            document.body.appendChild(input);
            input.setSelectionRange(0, 99999);
            input.select();
            try {
                if (document.execCommand('Copy')) {
                    document.execCommand('Copy');
                    callback && callback({ status: true });
                }
                else {
                    callback && callback({ status: false, message: "document.execCommand('Copy')不存在" });
                }
            }
            catch (err) {
                callback && callback({ status: false, message: err.message });
            }
            document.body.removeChild(input);
        }
    };
    var copyAsync = function (text) {
        return new Promise(function (resolve, reject) {
            if (text) {
                var input = document.createElement('input');
                input.setAttribute('readonly', 'readonly');
                input.setAttribute('value', text);
                document.body.appendChild(input);
                input.setSelectionRange(0, 99999);
                input.select();
                try {
                    if (document.execCommand('Copy')) {
                        document.execCommand('Copy');
                        resolve({ status: true });
                    }
                    else {
                        reject({ status: false, message: "document.execCommand('Copy')不存在" });
                    }
                }
                catch (err) {
                    reject({ status: false, message: err.message });
                }
                document.body.removeChild(input);
            }
        });
    };
    var requestFullscreen = function (id) {
        var docElm = document.getElementById(id);
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        }
        else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
        }
        else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        }
        else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        }
    };
    var exitFullScreen = function () {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    };
    var uniqueByKey = function (arr, key) {
        var hash = {};
        var result = arr.reduce(function (total, currentValue) {
            if (currentValue && typeof currentValue === 'object' && !hash[currentValue[key]]) {
                // 如果当前元素的key值没有在hash对象里，则可放入最终结果数组
                hash[currentValue[key]] = true; // 把当前元素key值添加到hash对象
                total.push(currentValue); // 把当前元素放入结果数组
            }
            return total; // 返回结果数组
        }, []);
        return result;
    };
    var hasNullValue = function (obj) {
        var _a;
        var result = false;
        (_a = Object.values(obj)) === null || _a === void 0 ? void 0 : _a.forEach(function (item) {
            if (item === '' || item === null) {
                result = true;
            }
        });
        return result;
    };
    /**
     * 判断对象是否至少有一项值
     * @param obj
     */
    var hasNotNullValue = function (obj) {
        var _a;
        var result = false;
        (_a = Object.values(obj)) === null || _a === void 0 ? void 0 : _a.forEach(function (item) {
            if (item !== '' && item !== null && item !== undefined) {
                result = true;
            }
        });
        return result;
    };
    var getParentNode = function (dom, classname) {
        if (!dom)
            return;
        var parentNode = dom.parentNode;
        if (parentNode && classname) {
            if (Array.from(parentNode.classList).includes(classname)) {
                return parentNode;
            }
            else {
                return getParentNode(parentNode, classname);
            }
        }
        return parentNode;
    };
    var getDataType = function (obj) {
        var s = Object.prototype.toString.call(obj);
        var result = s.match(/\[object (.*?)\]/);
        return result && result[1].toLowerCase();
    };
    /**
     * 防抖函数
     * @param obj
     * @returns  debounce 函数接收一个函数 F，等待时间 wait，以及一个可选的 immediate 标志
     */
    function debounce(func, wait, immediate) {
        if (immediate === void 0) { immediate = false; }
        var timeout = null;
        // 返回的函数与输入函数 F 接受相同的参数
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // 保存 this 上下文和传入的参数
            var context = this;
            // 清理函数，用于在等待时间结束后执行
            var later = function () {
                timeout = null;
                if (!immediate)
                    func.apply(context, args);
            };
            // 判断是否立即执行
            var callNow = immediate && timeout === null;
            // 如果已经有计时器存在，清除它，这样我们就可以重设等待时间
            if (timeout !== null) {
                clearTimeout(timeout);
            }
            // 重新设置计时器
            timeout = setTimeout(later, wait);
            // 如果设置了立即执行，那么没有计时器存在时就执行函数
            if (callNow)
                func.apply(context, args);
        };
    }
    /**
     * 节流函数
     * @param func
     * @param limit
     * @returns
     */
    function throttle(func, limit) {
        var inThrottle;
        var lastFunc;
        var lastRan;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var context = this;
            if (!inThrottle) {
                func.apply(context, args);
                lastRan = Date.now();
                inThrottle = true;
            }
            else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function () {
                    if (Date.now() - lastRan >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, Math.max(limit - (Date.now() - lastRan), 0));
            }
        };
    }

    exports.compute = compute;
    exports.copy = copy;
    exports.copyAsync = copyAsync;
    exports.dataURItoBlob = dataURItoBlob;
    exports.debounce = debounce;
    exports.downloadFile = downloadFile;
    exports.exitFullScreen = exitFullScreen;
    exports.format = format;
    exports.formatDate = formatDate;
    exports.getCookies = getCookies;
    exports.getDataType = getDataType;
    exports.getParentNode = getParentNode;
    exports.getUrlParams = getUrlParams;
    exports.hasNotNullValue = hasNotNullValue;
    exports.hasNullValue = hasNullValue;
    exports.packUrlParams = packUrlParams;
    exports.requestFullscreen = requestFullscreen;
    exports.setSearchParams = setSearchParams;
    exports.throttle = throttle;
    exports.uniqueByKey = uniqueByKey;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
