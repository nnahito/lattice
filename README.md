# lattice.js
tableタグの中の行、列を簡単に増減したり、
tableタグの中身をJSON形式で取得できたりします。

# 使い方

## 絶対やること
- jQueryの読み込み。例：`<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>`
- JSファイルの読み込み。例：`<script src="lattice.js"></script>`
- インスタンスの生成。例：`$Lattice = new Lattice('テーブルのIDなど。#elementとか。');`


## 最初
### インスタンス生成時には、引数は以下のものを取ります。  
0. テーブル要素のIDなど（例：#element）
0. （略可）行数（例：5）
0. （略可）列数（例：3）

以下、サンプル

```
$Lattice = new Lattice('#element');
```


## 行を追加する
`addRow()`メソッドを使います。

以下、サンプル

```
$Lattice.addRow();
```


## 列を追加する
`addCol()`メソッドを使います。

以下、サンプル

```
$Lattice.addCol();
```

## 行を削除する
`removeRow()`メソッドを使います。

以下サンプル

```
$Lattice.removeRow();
```


## 列を削除する
`removeCol()`メソッドを使います。

以下サンプル

```
$Lattice.removeCol();
```


## テーブルのデータをJSON形式で取得する
`get`メソッドを使います。

以下サンプル

```
let json = $Lattice.get();
```
