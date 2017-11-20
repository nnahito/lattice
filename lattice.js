
/**
 * HTMLのテーブルを簡単に増減でき、内容をJSONで取得できるJSのモデル
 * @author Nな人
 */
var Lattice = (function() {

    /**
     * コンストラクタ
     * 初期設定をここで渡す。
     *
     * @param       {string}     element      テーブル要素のid名
     * @param       {string}     html=''      セル内に表示するHTML
     * @param       {Number}     rows=1       行数
     * @param       {Number}     cols=1       列数
     * @constructor
     */
    function Lattice(element, html='', rows=1, cols=1) {
        // プロパティに要素名を保存しておく
        this.panel_name = element;          // 要素の名前
        this.html = html;                   // セル内に表示するHTML
        this.rows = rows;                   // 行数
        this.cols = cols;                   // 列数
    }


    /**
     * 必要情報を初期化する
     */
    Lattice.prototype.initialize = function() {
        // 初期のテーブルを表示させる
        for (var i = 0; i < this.rows; i++) {
            // 行の準備
            let element = '<tr>';

            for (var j = 0; j < this.cols; j++) {
                // セルを足していく
                element += '<td>' + this.html + '</td>';
            }

            // 行の終わり
            element += '</tr>';

            // 表に連結する
            $(this.panel_name).append(element);

        }

    }


    /**
     * 行の追加
     */
    Lattice.prototype.addRow = function(){
        // 最終行を属性ごとまるっとコピー
        let clone = $(this.panel_name + ' tr:last').clone(true);

        // まるっと追加
        $(this.panel_name).append(clone);
    }


    /**
     * 列の追加
     */
    Lattice.prototype.addCol = function(){
        var cell = $(this.panel_name + ' tr:first td').length;
        var html = this.html;

        $(this.panel_name + ' tr').each(function(i) {
            $(this).append('<td>' + html + '</td>');
        });
    }


    /**
     * 行の削除
     */
    Lattice.prototype.removeRow = function(){
        if( $(this.panel_name + ' tr').length > 1) {
          $(this.panel_name + ' tr:last').remove();
        }
    }


    /**
     * 行の削除
     */
    Lattice.prototype.removeCol = function(){
        if($(this.panel_name + ' tr:first td').length > 1) {
            $(this.panel_name + ' tr').each(function() {
                $(this).children(':last').remove();
            });
        }
    }


    /**
     * テーブルの全情報を取得
     * @return {JSON} セルの情報を返す
     */
    Lattice.prototype.get = function(){

        // 全行を取得
        let all_lines = $(this.panel_name + ' tr');

        // 各セルの情報をJSONテキストで保存していく
        var json = [];
        for (var i=0; i<all_lines.length; i++) {

            // その行にあるセルをすべて取得
            var cells = all_lines.eq(i).children();

            // 一つ一つのセルを取得していく
            for (var j = 0; j < cells.length; j++) {

                // セルのテキストを取得
                let cell_text = cells.eq(j).text();

                // セルの属性をすべて取得
                let attrs = $(cells.eq(j)).get(0).attributes;
                let attrtext = '';
                let attrJson = {};

                for (var k = 0; k < attrs.length; k++) {
                    attrtext += '{"'+ attrs[k]['name'] +'": "'+ attrs[k]['value'] +'"},';
                }

                // 最後のカンマを削除
                attrtext = attrtext.slice(0, -1);

                // 配列化
                attrtext = '['+ attrtext +']';

                if ( attrtext !== '' ){
                    attrJson = JSON.parse(attrtext);
                }



                // 追加用のJSON作成
                let map = {
                    "row_num": i+'',                   // 行番号
                    "col_num": j+'',                   // 列番号
                    "cell_text": cell_text,            // セルのテキスト
                    "attributes": attrJson             // セルのクラス
                }

                // データを保存
                json.push(map);
            }

        }


        // JSONデータを返す
        return json;

    }



    return Lattice;


})();
