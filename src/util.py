import json
import requests
from bs4 import BeautifulSoup

f = open('config.json')

data = json.load(f)

# res = requests.get('https://help.sorairo.jp/werewolf-judgment/01_01.html#42')
# soup = BeautifulSoup(res.text, 'html.parser')
# for index, table in enumerate(soup.findAll('table')):
#     print('=' * 200)
#     image_id = str(table).split('src="./img/')[1].split('.png"')[0]
#     sub_text = str(table).split('<td valign="top">')[1].split('</td>')
#     print(table)
#     data['roles'][index]['html'] = str(table).replace('="./', '="https://help.sorairo.jp/werewolf-judgment/').replace(
#         '<a ', '<a target="_blank" ')
#     print(index)
#
# res = requests.get('https://help.sorairo.jp/werewolf-judgment/01_02.html')
# soup = BeautifulSoup(res.text, 'html.parser')
# for index, table in enumerate(soup.findAll('table')):
#     print('=' * 200)
#     image_id = str(table).split('src="./img/')[1].split('.png"')[0]
#     sub_text = str(table).split('<td valign="top">')[1].split('</td>')
#     print(table)
#     data['roles'][index + 49]['html'] = str(table).replace('="./', '="https://help.sorairo.jp/werewolf-judgment/').replace(
#         '<a ', '<a target="_blank" ')

for index, role in enumerate(data['roles']):
    i = index + 1
    if i <= 49:
        role['html'] = 'https://help.sorairo.jp/werewolf-judgment/01_01.html#' + str(i).zfill(2)
    if index >= 50:
        role['html'] = 'https://help.sorairo.jp/werewolf-judgment/01_02.html#' + str(i - 49).zfill(2)
    print(index, role)

#
with open('out.json', 'w', encoding='utf8') as json_file:
    json.dump(data, json_file, ensure_ascii=False)
