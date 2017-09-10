

var Lattice = (function() {

    /**
     * コンストラクタ
     * 初期設定をここで渡す。
     *
     * @param       {string}     element      テーブル要素のid名
     * @param       {Number} [rows=1]
     * @param       {Number} [cols=1]     [description]
     * @constructor
     */
    function Lattice(element, rows=1, cols=1) {
        // プロパティに要素名を保存しておく
        this.panel_name = element;          // 要素の名前
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
                element += '<td>あ</td>';
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
        $(this.panel_name).append('<tr>' +  + '</tr>');

        for( var i = 0; i < $(this.panel_name + ' tr:first td').length; i++) {
            $(this.panel_name + ' tr:last').append('<td>' + (i + 1) + '</td>');
        }
    }


    /**
     * 列の追加
     */
    Lattice.prototype.addCol = function(){
        var cell = $(this.panel_name + ' tr:first td').length;
        $(this.panel_name + ' tr').each(function(i) {
            $(this).append('<td>' + (i + 1) + '</td>');
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

                // セルの状態（クラス）を取得
                let cell_stat = cells.eq(j).attr('class');
                if ( cell_stat === undefined ){
                    cell_stat = '';
                }

                // 追加用のJSON作成
                let map = {
                    "row_num": i+'',                   // 行番号
                    "col_num": j+'',                   // 列番号
                    "cell_text": cell_text,         // セルのテキスト
                    "cell_stat":cell_stat           // セルのクラス
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
