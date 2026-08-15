# -*- coding: utf-8 -*-
"""
Created on Fri Jul 31 12:10:51 2020

@author: nt0ny
"""

import collections
import json
import os
import re
import time
import urllib.request

import frontmatter
from bs4 import BeautifulSoup

max_records = 1000

search_url = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=xml&term="holmes%20AB"&field=author&sort=pub+date&usehistory=y&api_key=fd2a5fb8bbf75480b2371d464d6e7dd95f08'
# fetch_url = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id={}&retmode=xml&rettype=abstract&WebEnv={}&query_key={}&api_key=fd2a5fb8bbf75480b2371d464d6e7dd95f08'
fetch_url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&rettype=abstract&WebEnv={}&query_key={}&api_key=fd2a5fb8bbf75480b2371d464d6e7dd95f08"

month_map = {
    "jan": 1,
    "feb": 2,
    "mar": 3,
    "apr": 4,
    "may": 5,
    "jun": 6,
    "jul": 7,
    "aug": 8,
    "sep": 9,
    "oct": 10,
    "nov": 11,
    "dec": 12,
}


def to_string(root, element, default=""):
    item = root

    for e in element.split("."):
        item = item.find(e)

        if item is None:
            return default

    return item.text


def to_month(text):
    if isinstance(text, int):
        return text

    if re.match(r"\d+", text):
        return int(text)

    text = text.lower()

    if text in month_map:
        return month_map[text]
    else:
        return -1


publications = []
current_publication = None
mode = None
abstract = ""

with open("medline.txt", "r") as f:
    for line in f:
        line = line.rstrip()
        print(line)
        if line.startswith("PMID"):
            pmid = line.split("- ")[1]
            publications.append(
                {
                    "pmid": pmid,
                    "pmcid": "",
                    "doi": "",
                    "title": "",
                    "abstract": "",
                    "authorList": [],
                    "authors": "",
                    "journal": "",
                    "year": -1,
                    "month": -1,
                    "day": -1,
                    "volume": "",
                    "issue": "",
                    "pages": "",
                    "tagList": [],
                    "url": "",
                    "labs": [],
                    "peopleList": [],
                }
            )

            current_publication = publications[-1]
        elif line.startswith("AU "):
            author = line.split("- ")[1]
            current_publication["authorList"].append(author)
        elif line.startswith("DP "):
            date = line.split("- ")[1]
            date_parts = date.strip().split(" ")
            current_publication["year"] = int(date_parts[0])
            if len(date_parts) > 1:
                current_publication["month"] = to_month(date_parts[1])
            if len(date_parts) > 2:
                current_publication["day"] = int(date_parts[2])
        elif line.startswith("TA "):
            current_publication["journal"] = line.split("- ")[1]
        elif line.startswith("TI "):
            current_publication["title"] = line.split("- ")[1]
            mode = "title"
        elif line.startswith("AB "):
            current_publication["abstract"] = line.split("- ")[1]
            mode = "abstract"
        else:
            # clear mode
            if re.match(r"^[A-Z]{2}", line):
                mode = None
            else:
                if mode == "title":
                    current_publication["title"] += " " + line.strip()
                elif mode == "abstract":
                    current_publication["abstract"] += " " + line.strip()
                else:
                    pass


for pub in publications:
    pub["authors"] = ", ".join(pub["authorList"])

with open("publications.json", "w") as outfile:
    json.dump(publications, outfile, indent=2)
