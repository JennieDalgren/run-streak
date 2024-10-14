import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'app', 'data.json');

export async function GET() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read calendar data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const newData = await request.json();
    await fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2));
    return NextResponse.json({ message: 'Calendar data updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update calendar data' }, { status: 500 });
  }
}

