import { useState, useEffect } from 'react';
import { ResumeData, TemplateType, FontSettings } from './types/resume';
import { defaultResumeData, backgroundColors } from './utils/resumeData';
import { EditorPanel } from './components/EditorPanel';
import { ResumePreview } from './components/ResumePreview';
import { TemplateSelector } from './components/TemplateSelector';
import { BackgroundPicker } from './components/BackgroundPicker';
import { FontSelector } from './components/FontSelector';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Printer, Eye, Edit } from 'lucide-react';

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [template, setTemplate] = useState<TemplateType>('modern');
  const [backgroundColor, setBackgroundColor] = useState('bg-white');
  const [fontSettings, setFontSettings] = useState<FontSettings>({
    family: 'font-inter',
    size: 'medium'
  });
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');

  useEffect(() => {
    const saved = localStorage.getItem('resumeData');
    if (saved) {
      setResumeData(JSON.parse(saved));
    }
    const savedFontSettings = localStorage.getItem('fontSettings');
    if (savedFontSettings) {
      setFontSettings(JSON.parse(savedFontSettings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem('fontSettings', JSON.stringify(fontSettings));
  }, [fontSettings]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&family=Open+Sans:wght@300;400;600;700&family=Lato:wght@300;400;700&family=Merriweather:wght@300;400;700&display=swap');
        
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-georgia { font-family: Georgia, serif; }
        .font-roboto { font-family: 'Roboto', sans-serif; }
        .font-opensans { font-family: 'Open Sans', sans-serif; }
        .font-lato { font-family: 'Lato', sans-serif; }
        .font-merriweather { font-family: 'Merriweather', serif; }
        
        @media print {
          body * {
            visibility: hidden;
          }
          .print-content, .print-content * {
            visibility: visible;
          }
          .print-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          @page {
            margin: 0.5in;
          }
        }
      `}</style>
      
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Resume Editor</h1>
          <div className="flex gap-3">
            <Button
              variant={viewMode === 'edit' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('edit')}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button
              variant={viewMode === 'preview' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('preview')}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handlePrint} size="sm">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {viewMode === 'edit' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Design Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <TemplateSelector selected={template} onChange={setTemplate} />
                  <BackgroundPicker selected={backgroundColor} onChange={setBackgroundColor} />
                  <FontSelector settings={fontSettings} onChange={setFontSettings} />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Edit Resume</CardTitle>
                </CardHeader>
                <CardContent>
                  <EditorPanel data={resumeData} onChange={setResumeData} />
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:sticky lg:top-6 h-fit">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Live Preview</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="transform scale-75 origin-top">
                    <div className="print-content">
                      <ResumePreview 
                        data={resumeData} 
                        template={template} 
                        backgroundColor={backgroundColor}
                        fontSettings={fontSettings}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="print-content">
            <ResumePreview 
              data={resumeData} 
              template={template} 
              backgroundColor={backgroundColor}
              fontSettings={fontSettings}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;