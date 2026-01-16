from docx import Document
import json

word_file = r'2. Test Design\UniStyle Requirement Traceability Matrix v1.0.docx'
doc = Document(word_file)

requirements = {}

# Extract all tables
for table_idx, table in enumerate(doc.tables):
    for row_idx, row in enumerate(table.rows):
        cells = row.cells
        if len(cells) >= 2:
            req_id = cells[0].text.strip()
            req_desc = cells[1].text.strip()
            
            if req_id and req_id.startswith('REQ-'):
                # Get full text without truncation
                full_text = req_desc.replace('\n', ' ').strip()
                if req_id not in requirements:
                    requirements[req_id] = full_text

# Print requirements
for i in range(1, 28):
    req_id = f'REQ-{str(i).zfill(3)}'
    if req_id in requirements:
        print(f'{req_id}|{requirements[req_id]}')
    else:
        print(f'{req_id}|Not found')
