import asyncio
import json
import requests
from bs4 import BeautifulSoup
from html2text import html2text


async def get_results(q: str):
    url = "https://google.serper.dev/search"

    payload = json.dumps({"q": q})
    headers = {
        "X-API-KEY": "2a419454db38b1267362ca5bb084f94d9b99a131",
        "Content-Type": "application/json",
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    return response.json()["organic"]


async def get_link_contents(url: str):
    response = requests.get(url)
    return html2text(response.text)
    # soup = BeautifulSoup(response.text, "html.parser")
    # return soup.prettify()


async def main():
    results = await get_results(
        "socket.io not connecting to python server from kotlin client site:stackoverflow.com"
    )
    for result in results:
        contents = await get_link_contents(result["link"])
        print(f"{result['title']}\n\n{contents}\n\n---\n\n")


if __name__ == "__main__":
    asyncio.run(main())
