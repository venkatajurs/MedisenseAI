// src/utils/pdfWorker.ts
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker?worker';

// Assign the worker to the pdfjsLib global options
pdfjsLib.GlobalWorkerOptions.workerPort = new pdfjsWorker();
